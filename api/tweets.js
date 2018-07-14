'use strict';
var request = require('request');
var querystring = require('querystring');

function addStatus(tweets) {
  return tweets
    .filter(tweet => {
      if (!tweet.text.match(/@/)) {
        return tweet;
      }
    })
    .map(tweet => {
      let status = 'green';

      if (tweet.text.match(/Heavy volume/)) {
        status = 'red';
      } else if (tweet.text.match(/Moderate volume/)) {
        status = 'yellow';
      }

      return {
        status,
        tweet_text: tweet.text,
        tweet_url: (tweet.entities.urls[0]) ? tweet.entities.urls[0].url : null,
        tweet_date: tweet.created_at,
      };
    });
}

module.exports.handler = (event, context, callback) => {
  var queryString = querystring.stringify({
    screen_name: 'officialLRT1',
    count: 100,
  });

  var options = {
    url: `https://api.twitter.com/1.1/statuses/user_timeline.json?${queryString}`,
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAPm87gAAAAAABEYX8OVCfxle2GlEPsb2MSww5%2Fw%3DoqyfXksZbtCv3VpNPMW1GG6gZ3JutVPLf4F1bZfgfM4qNOKwb4'
    }
  };

  request(options, function (error, response, body) {
    var tweets = addStatus(JSON.parse(body));
    callback(null, {
      statusCode: 200,
      body: tweets,
    });
  });
};
