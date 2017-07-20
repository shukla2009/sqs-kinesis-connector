'use strict';
module.exports = {
    aws: {
        access: {
            id: process.env.AWS_ACCESS_ID,
            key: process.env.AWS_ACCESS_KEY
        },
        region: process.env.AWS_REGION,
        kinesis: {
            stream: process.env.AWS_KINESIS_STREAM
        },
        sqs: {
            url: process.env.AWS_SQS_URL,
            maxMessge: process.env.AWS_SQS_MAX_MESSAGE || 10,
            refreshTime: process.env.AWS_SQS_REFRESH_TIME || 10000
        }
    },
    log: {
        level: process.env.LOG_LEVEL || 'info'
    }
};