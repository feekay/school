var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var course ={}

course.addCourse=function(req, res){
    model.Course.create({
        name: post.name
    }).then(function(){
        res.status= 201;
        res.send();
    });
}
course.getCourse=function(req, res){
    var param = req.params;

    model.Course.find({
        where:{
            id: param.course
        }
    })
    .then(function(Course){
        res.json(Course);
    });
}
course.getCourses=function(req, res){
    model.Course.findAll().then(function(Courses){
        //Logic
       // res.append
       res.json(Courses);
    });
}


module.exports = course;
