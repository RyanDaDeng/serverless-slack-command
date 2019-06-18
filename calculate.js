// calculate.js

var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
// Create an SQS service object
const sqs = new AWS.SQS({region: 'eu-central-1', apiVersion: '2012-11-05'})


async function sendToSqs(message) {

    var params = {
        MessageBody: message, /* required */
        QueueUrl: `https://sqs.eu-central-1.amazonaws.com/${process.env.accountId}/MyQueue`, /* required */
    };
    console.log('start sending.....');
    // sqs.sendMessage(params, function (err, data) {
    //     if (err) {
    //         console.log("Error", err);
    //     } else {
    //         console.log("Success", data.MessageId);
    //     }
    // });
    //
    return sqs.sendMessage(params).promise();

}

module.exports.handler = async (event) => {

    console.log(event);
    const number= event.Records[0].Sns.Message

    console.log(number);
    let message;
    if(number%2 === 0){
        message = 'Number: '+number+' is even.'
    }else{
        message= 'Number: '+number+' is odd.'
    }

    console.log(message)
    try {
        console.log('start to push sqs');
        await sendToSqs(message);
        return generateResponse(200, {
            message: 'Successfully pushed to sqs.'
        })
    } catch (err) {
        return generateError(500, new Error('Couldn\'t push to sqs.'))
    }
};


function generateResponse(code, payload) {
    console.log(payload)
    return {
        statusCode: code,
        body: JSON.stringify(payload)
    }
}


function generateError(code, err) {
    console.error(err)
    return generateResponse(code, {
        message: err.message
    })
}