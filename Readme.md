SQS-Kinesis-Connector in Docker
===

This repository provides a connector to pull record from sqs and push to kinesis stream.

Run
---

```bash
docker run --name sqs-kinesis \
--env AWS_ACCESS_ID=<AWS_ACCESS_ID>\
--env AWS_ACCESS_KEY=<AWS_ACCESS_KEY>\
--env AWS_REGION=<AWS_REGION>\
--env AWS_KINESIS_STREAM=<AWS_KINESIS_STREAM>\
--env AWS_SQS_URL=<AWS_SQS_URL>\
-d shukla2009/sqs-kinesis-connector
```
