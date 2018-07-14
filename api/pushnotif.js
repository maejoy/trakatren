'use strict';
var AWS = require('aws-sdk');

module.exports.handler = (event, context, callback) => {
  AWS.config.update({
    accessKeyId: 'AKIAJK6TUWWOGUKP57MA',
    secretAccessKey: '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',
    region: 'ap-southeast-1'
  });

  var sns = new AWS.SNS();

  sns.createPlatformEndpoint({
    PlatformApplicationArn: 'arn:aws:sns:ap-southeast-1:576950900402:sample',
    Token: '5618d2b02af129e322ec526f3f34cec3d33e7538'
  }, function (err, data) {
    if (err) {
      console.log(err.stack);
      return;
    }

    var endpointArn = data.EndpointArn;

    var payload = {
      default: 'Hello World',
      APNS: {
        aps: {
          alert: 'Hello World',
          sound: 'default',
          badge: 1
        }
      }
    };

    // first have to stringify the inner APNS object...
    payload.APNS = JSON.stringify(payload.APNS);
    // then have to stringify the entire message payload
    payload = JSON.stringify(payload);

    console.log('sending push');
    sns.publish({
      Message: payload,
      MessageStructure: 'json',
      TargetArn: endpointArn
    }, function (err, data) {
      if (err) {
        console.log(err.stack);
        return;
      }

      console.log('push sent');
      console.log(data);
    });








  });
};