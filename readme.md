## Demo

A small slash command that determines if the given number is odd or even. (SQS,SNS,API Gateway,Lambda)

![](https://github.com/RyanDaDeng/serverless-slack-command/blob/master/demo.gif)

## Infrastructure
![](https://github.com/RyanDaDeng/serverless-slack-command/blob/master/WechatIMG3.jpeg)

## Installation

(The instructions is a bit unclear, if you want more details, please contact me.)

### Requirements
1. Serverless Framework https://serverless.com/
2. AWS account
3. Node


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

3. run sls remove to remove all resources from aws
### Playaround
1. run your command and follow by a digital number for example /my-slash-command 100
2. The server will tell you if the number is odd or even.

### IMPORTANCE
The sample is just a working example and code quality is poor at the moment. You might see some functions are duplicate.
This is just a good demo for you to be familiar with the Severless Framework.

