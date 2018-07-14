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
      //body: JSON.stringify([{ "status": "green", "tweet_text": "As of 1:21 PM, 27 Trains/ 92 LRVs running today at a safe speed of 40kph and 3.5 minutes interval. Ingat po sa biya… https://t.co/YTvUInauqv", "tweet_url": "https://t.co/YTvUInauqv", "tweet_date": "Fri Jul 13 05:22:15 +0000 2018" }, { "status": "green", "tweet_text": "UPDATE : As of 1:20 PM, Light volume of passengers on all 20 stations of LRT-1. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Fri Jul 13 05:21:19 +0000 2018" }, { "status": "green", "tweet_text": "UPDATE : As of 11:20 AM, Light volume of passengers on all 20 stations of LRT-1. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Fri Jul 13 03:21:43 +0000 2018" }, { "status": "green", "tweet_text": "As of 11:08 AM, 28 Trains/ 95 LRVs running today at a safe speed of 40kph and 3.5 minutes interval. Ingat po sa biy… https://t.co/PHWEqcWHAI", "tweet_url": "https://t.co/PHWEqcWHAI", "tweet_date": "Fri Jul 13 03:08:53 +0000 2018" }, { "status": "green", "tweet_text": "UPDATE : As of 10:55 AM, Light volume of passengers on all 20 stations of LRT-1. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Fri Jul 13 02:56:22 +0000 2018" }, { "status": "yellow", "tweet_text": "UPDATE : As of 9:31 AM, Moderate volume of passengers on all 20 stations of LRT-1. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Fri Jul 13 01:32:00 +0000 2018" }, { "status": "green", "tweet_text": "As of 9:03 AM, 29 Trains/ 98 LRVs running this morning at a safe speed of 40kph and 3.5 minutes interval. Ingat po… https://t.co/eK6TocujCp", "tweet_url": "https://t.co/eK6TocujCp", "tweet_date": "Fri Jul 13 01:04:11 +0000 2018" }, { "status": "red", "tweet_text": "UPDATE : As of 9:02 AM,Heavy volume of passengers at SB-Roosevelt, Balintawak, Yamaha Monumento. Moderate on 17 oth… https://t.co/huwKPoCDA5", "tweet_url": "https://t.co/huwKPoCDA5", "tweet_date": "Fri Jul 13 01:03:38 +0000 2018" }, { "status": "green", "tweet_text": "Skip Train for R. Papa is now leaving  5th Ave. Station. Thank you. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Fri Jul 13 00:42:38 +0000 2018" }, { "status": "red", "tweet_text": "As of 6:41 AM,Heavy volume of passengers at SB-Roosevelt, Balintawak, Yamaha Monumento. Moderate on 17 other stations. Ingat po sa biyahe!", "tweet_url": null, "tweet_date": "Thu Jul 12 22:42:16 +0000 2018" }, { "status": "green", "tweet_text": "As of 6:31 AM, 29 Trains/ 98 LRVs running this morning at a safe speed of 40kph and 3.5 minutes interval. Ingat po… https://t.co/tL4D47Lnx4", "tweet_url": "https://t.co/tL4D47Lnx4", "tweet_date": "Thu Jul 12 22:32:19 +0000 2018" }])
    });
  });
};
