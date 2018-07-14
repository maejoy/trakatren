'use strict';
var request = require('request');

module.exports.handler = (event, context, callback) => {
  var options = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=OfficialLRTA&count=10',
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAPm87gAAAAAABEYX8OVCfxle2GlEPsb2MSww5%2Fw%3DoqyfXksZbtCv3VpNPMW1GG6gZ3JutVPLf4F1bZfgfM4qNOKwb4'
    }
  };

  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  });
};
