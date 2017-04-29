var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var teacher ={}

teacher.addTeacher=function(req, res){
    model.Teacher.create()
    .then(function(s){
        model.User.create({
        firstname: post.firstname,
        lastname: post.lastname,
        gender: post.gender,
        dob: post.dob ? new Date(post.dob):null
        })
        .then(function(user){
            s.setUser(user);
        });

        res.status= 201;
        res.send();
    });
}
teacher.getTeacher=function(req, res){
    var param = req.params;

    model.Teacher.find({
        where:{
            id: param.teacher
        }
    })
    .then(function(Teacher){
        res.json(Teacher);
    });
}
teacher.getTeachers=function(req, res){
    model.Teacher.findAll().then(function(Teachers){
        //Logic
       // res.append
       res.json(Teachers);
    });
}

module.exports = teacher;
