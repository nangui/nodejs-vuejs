'use strict'
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    datenaiss: DataTypes.DATE,
    bio: DataTypes.TEXT,
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  }
  return User
}
