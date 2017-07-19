'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,    
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasOne(models.Student, {as:"Student",foreignkey:"userId"});
        models.User.hasOne(models.Teacher, {as:"Teacher",foreignkey:"userId"});
        models.User.hasOne(models.Staff, {as:"Staff",foreignkey:"userId"});
        
      }
    }
  });
  return User;
};
