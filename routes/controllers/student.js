var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var student ={}

student.addStudent=function(req, res){
    var post = req.body;
    model.Student.create()
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
student.getStudent=function(req, res){
    var param = req.params;

    model.Student.find({
        include: [
            {
                model: model.User,
                as: "User"
            }
            ],
            where:{
            id: param.student
        }
    })
    .then(function(Student){
        res.json(Student);
    });
}
student.getStudents=function(req, res){
    model.Student.findAll({
        include: [
            {
                model: model.User,
                as: "User"
            },
            {
                model: model.Section,
                as :  "Class"
            }
            ]
    }).then(function(Students){
        //Logic
       // res.append
       res.json(Students);
    });
}


module.exports = student;
