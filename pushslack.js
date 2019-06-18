// calculate.js

function generateResponse(code, payload) {
    console.log(payload)
    return {
        statusCode: code,
        body: JSON.stringify(payload)
    }
}
const https = require('https');
module.exports.handler =   function(event, context) {

    console.log(event);
    console.log('push slack data now...');
    const message = event.Records[0].body;
    console.log(message);
    //


    var body='';
    var jsonObject = JSON.stringify({text:message});

    // the post options
    var optionspost = {
        host: 'hooks.slack.com',
        path: '/services/TJWF3F80Y/BKNN8RUCX/BqOlRARZAvKdPvD8l9wkqqWO',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function (chunk) {
            body += chunk;
        });
        context.succeed('Blah');
    });

    reqPost.write(jsonObject);
    reqPost.end();



    // request.post('https://hooks.slack.com/services/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', {
    //     json: {
    //         text: message
    //     }
    // }, (error, res, body) => {
    //     if (error) {
    //         console.error(error)
    //         return
    //     }
    //     console.log(`statusCode: ${res.statusCode}`)
    //     console.log(body)
    // })

     return generateResponse(200,{'message':message})
};