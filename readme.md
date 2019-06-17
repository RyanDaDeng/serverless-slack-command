## Demo
https://github.com/RyanDaDeng/serverless-slack-command/blob/master/demo.gif

## Installation

(The instructions is a bit unclear, if you want more details, please contact me.)

### Requirements
1. Serverless Framework https://serverless.com/
2. AWS account
3. Node

### Create your SQS

pre-step:
1. Firstly create a queue in your aws SQS
2. run node sqs_listqueues.js to see if your queue is retrieved (before using it you should run npm install first)
3. Copy your queue url
4. Go to calculate.js and paste your queue url in QueueUrl

### Set up your own workspace slack

1. Create a slack account
2. Go to slack app, create a slash commands
3. Paste the amazon api link
4. Go to Incoming Webhooks in slack app, enable it. and copy Webhooks url
5. Go to pushslack.js and paste your webhooks url


### Deploy to AWS
1. run sls deploy
2. You should get a amazon api link, copy it and save it somewhere

(note the region currently hard-coded in eu-central-1)

### Playaround
1. run your command and follow by a digital number for example /my-slash-command 100
2. The server will tell you if the number is odd or even.

### IMPORTANCE
The sample is just a working example and code quality is poor at the moment. You might see some functions are duplicate.
This is just a good demo for you to be familiar with the Severless Framework.

