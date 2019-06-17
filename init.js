// init.js
const aws = require('aws-sdk')
const sns = new aws.SNS({region: 'eu-central-1'});
const URLSearchParams = require('url').URLSearchParams;

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

async function publishSnsTopic(data) {
    const params = {
        Message: JSON.stringify(data),
        TopicArn: `arn:aws:sns:${process.env.region}:${process.env.accountId}:calculate-topic`
    }
    return sns.publish(params).promise()
}

module.exports.handler = async (event, context, callback) => {
    console.log(event);
    let params = new URLSearchParams(event.body);
    const data = Number(params.get("text")); // "foo"
    console.log(data);
    if (isNaN(data)) {
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify({
                message: 'Invalid number!'
            }),
        };

        callback(null, response);
    }

    try {
        const metadata = await publishSnsTopic(data);

        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: JSON.stringify({
                message: 'Data is in processing, please wait....!',
                data: metadata
            }),
        };

        callback(null, response);
    } catch (err) {
        return generateError(500, new Error('Couldn\'t add the calculation due to an internal error.'))
    }
}