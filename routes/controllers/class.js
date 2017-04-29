var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var cls ={}

cls.getClass=function(req, res){
    var param = req.params;

    model.Class.find({
        where:{
            id: param.class
        }
    })
    .then(function(Class){
        res.json(Class);
    });
}
cls.getClasses=function(req, res){
    model.Class.findAll().then(function(Classes){
        //Logic
       // res.append
       res.json(Classes);
    });
}

cls.addCourse= function(req, res, next){
    var post = req.body;    
    model.Class.find({
        where:{
            id: param.class
        }
    })
    .then(function(Class){
       model.Course.find({
            where:{
                id: post.courseId
            }
        })
        .then(function(Course){
            Class.addCourse(Course);
            res.sendStatus(201);
        }); 
    });
}

cls.getCourses = function(req, res, next){
    model.Class.find({
        include:[
            { model: model.Course, as: "Courses" }
        ],
        where:{
            id: param.class
        }
    })
    .then(function(Class){
        res.json(Class.Courses);
    });
}

module.exports = cls;
