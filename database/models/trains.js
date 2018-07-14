'use strict';
module.exports = function (sequelize, DataTypes) {
  var Trains = sequelize.define('Trains', {
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    speed: DataTypes.DOUBLE,
  }, {
      timestamps: false,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Trains;
};