'use strict';
var db = require('../database/models');
var humanizeDuration = require('humanize-duration');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

module.exports.handler = (event, context, callback) => {
  let id = event.pathParameters.id;

  db.Stations.findById(id).then((station) => {
    db.Trains.findAll()
      .then((trains) => {
        let response = [];
        let southLatitude = 0;
        let northLatitude = 0;
        let nearestTrains = [];

        for (let i = 0; i < trains.length; i++) {
          if (trains[i].name == 'southbound' && ((trains[i].latitude - station.latitude) > 0) && ((southLatitude == 0) || (trains[i].latitude < southLatitude))) {
            southLatitude = trains[i].latitude;
            nearestTrains[0] = {
              latitude: trains[i].latitude,
              longitude: trains[i].longitude,
              speed: trains[i].speed,
              name: trains[i].name
            };
          }
          if (trains[i].name == 'northbound' && ((trains[i].latitude - station.latitude) < 0) && ((northLatitude == 0) || (trains[i].latitude > northLatitude))) {
            northLatitude = trains[i].latitude;
            nearestTrains[1] = {
              latitude: trains[i].latitude,
              longitude: trains[i].longitude,
              speed: trains[i].speed,
              name: trains[i].name
            };
          }
        }

        for (let i = 0; i < nearestTrains.length; i++) {
          if (typeof nearestTrains[i] !== 'undefined') {
            let distance = getDistanceFromLatLonInKm(station.latitude, station.longitude, nearestTrains[i].latitude, nearestTrains[i].longitude);
            let time = humanizeDuration((distance / nearestTrains[i].speed) * 3600000, { units: ['h', 'm'], round: true }); //convert to seconds

            response.push({
              direction: nearestTrains[i].name,
              ETA: time,
            });
          }
        }

        callback(null, {
          statusCode: 200,
          body: response,
        });
      });
  });
};
