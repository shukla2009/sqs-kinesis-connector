'use strict';
var config = require('./config');
var logger = require('./logger')(module);
var util = require('util');
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.aws.access.id,
    secretAccessKey: config.aws.access.key,
    sslEnabled: true
});

var paramsSQS = {
    QueueUrl: config.aws.sqs.url,
    MaxNumberOfMessages: config.aws.sqs.maxMessge,
    VisibilityTimeout: 60
};

var kinesis = new AWS.Kinesis({
    region: config.aws.region
});

var sqs = new AWS.SQS({
    region: config.aws.region
});

function sendToKinesis(records) {
    logger.info(util.format('Sending %d object To Kinesis', records.length));
    var recordsParams = {
        Records: records,
        StreamName: config.aws.kinesis.stream
    };
    kinesis.putRecords(recordsParams, function (err, data) {
        if (err) {
            logger.error(err);
        }
        else {
            logger.info(util.format('Sent %d records with %d failures ..', records.length, data.FailedRecordCount));
        }
    });
}
function deletefromSQS(rhandle) {
    sqs.deleteMessage({
        QueueUrl: config.aws.sqs.url,
        ReceiptHandle: rhandle
    }, function (err, edata) {
        if (err) {
            logger.error(err);
        } else {
            logger.debug('Message deleted from SQS' + JSON.stringify(edata));
        }
    });

}

function process() {
    sqs.receiveMessage(paramsSQS, function (err, sdata) {
            if (err) {
                logger.error(err);
            }
            else {
                if (sdata && !!sdata.Messages) {
                    var records = [];
                    sdata.Messages.forEach(function (m) {
                        var data = JSON.parse(m.Body);
                        var record = {
                            Data: JSON.stringify(data),
                            PartitionKey: data.type
                        };
                        records.push(record);
                        deletefromSQS(m.ReceiptHandle);
                    });
                    if (records.length !== 0) {
                        sendToKinesis(records);
                    }
                }
            }
            setTimeout(process, config.aws.sqs.refreshTime);
        }
    );
}
process();