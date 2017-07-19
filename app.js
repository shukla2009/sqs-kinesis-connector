var env = process.env.ENV || 'prod';
var configUrl = './config/' + env;
var config = require(configUrl);

console.log(JSON.stringify(config));

// var AWS = require('aws-sdk');
// var fs = require('fs');
// var config = require('./config');
// var util = require('util');
//
// AWS.config.update({
//     accessKeyId: config.aws1.access.id,
//     secretAccessKey: config.aws1.access.key,
//     sslEnabled: true
// });
//
// var paramsSQS = {
//     QueueUrl: config.sqs.base_url + config.sqs.queue, // required
//     MaxNumberOfMessages: 10,
//     VisibilityTimeout: 60
// };
//
//
// var sqs = new AWS.SQS({
//     region: config.sqs.region
// });
// function process() {
//     sqs.receiveMessage(paramsSQS, function (err, sdata) {
//         if (err) {
//             console.log("ERROR :" + err);
//         }
//         else {
//             if (sdata && !!sdata.Messages)
//                 var records = [];
//             sdata.Messages.forEach(function (m) {
//                 var data = JSON.parse(m.Body);
//                 var record = {
//                     Data: JSON.stringify(data),
//                     PartitionKey: data.type
//                 };
//                 records.push(record);
//             });
//             if (records.length !== 0) {
//                 sendToKinesis(records)
//             }
//         }
//         setTimeout(process, 5000);
//     });
// }
// var AWS1 = require('aws-sdk');
//
// AWS1.config.update({
//     accessKeyId: config.aws1.access.id,
//     secretAccessKey: config.aws1.access.key,
//     sslEnabled: true
// });
//
// var kinesis = new AWS1.Kinesis({region: config.kinesis.region});
//
//
// function sendToKinesis(records) {
//     console.log("Sending To Kinesis" + records);
//     var recordsParams = {
//         Records: records,
//         StreamName: config.kinesis.stream
//     };
//
//     kinesis.putRecords(recordsParams, function (err, data) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(util.format("Sent %d records with %d failures ..", records.length, data.FailedRecordCount));
//         }
//     });
// }
//
// process();
