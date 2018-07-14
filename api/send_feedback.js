'use strict';
var AWS = require('aws-sdk');
var querystring = require('querystring');

module.exports.handler = (event, context, callback) => {
  const SESDetails = {
    accessKeyId: 'AKIAJJ7BRNQUSEXNICJQ',
    secretAccessKey: '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',
    region: 'us-east-1',
  };

  let body = (event.body !== '') ? querystring.parse(event.body) : {};

  const emailDetails = {
    body: body.feedback,
    destination: ['maejoyvalentin@gmail.com'],
    subject: 'Track-a-Tren Feedback',
    source: 'trackatren@gmail.com',
  };

  const ses = new AWS.SES(SESDetails);

  const params = {
    Destination: {
      ToAddresses: emailDetails.destination,
    },
    Message: {
      Body: {
        Text: {
          Data: emailDetails.body,
        },
      },
      Subject: {
        Data: emailDetails.subject,
        Charset: 'UTF-8',
      },
    },
    Source: emailDetails.source,
  };

  ses.sendEmail(params, (err, res) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: err
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: res
      });
    }
  });
};
