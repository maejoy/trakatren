'use strict';
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    current_points: DataTypes.DOUBLE,
    total_points: DataTypes.DOUBLE,
    last_claimed: DataTypes.DATE,
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return User;
};