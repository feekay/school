'use strict';
module.exports = function(sequelize, DataTypes) {
  var Section = sequelize.define('Section', {
    number: {
      type:DataTypes.INTEGER,
      unique:true,
      allowNull:false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Section.belongsTo(models.Class, {as:"Class", forignkey:"classId"});
        models.Section.hasMany(models.Student, {as:"Students",foreignkey:"secId"});
        models.Section.hasMany(models.Activity, {as:"Activities", foreignkey:"sectionId"});
      }
    }
  });
  return Section;
};
