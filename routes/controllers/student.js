var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var student = {}
/** 
 *  
*/
student.editStudent = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Student.find({ where: { id: param.student } })
        .then(function (s) {
            s.updateAttributes({
                firstname: post.firstname ? post.firstname : s.firstname,
                lastname: post.lastname ? post.lastname : s.lastname,
                gender: post.gender ? post.gender : s.gender,
                dob: post.dob ? new Date(post.dob) : s.dob
            });
            res.status = 201;
            res.send();
        });
        
}
/** 
 *  
*/
student.addStudent = function (req, res, next) {
    var post = req.body;
    model.Student.create().then(function (s) {
        model.User.create({
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null
        }).then(function (user) {
            s.setUser(user);
        });
        res.status = 201;
        res.send();
    });
    
}
/** 
 *  
*/
student.getStudent = function (req, res, next) {
    var param = req.params;
    model.Student.find({
        include: [
            {
                model: model.User,
                as: "User"
            },
            {
                model: model.Section,
                as: "Class"
            }
        ],
        where: {
            id: param.student
        }
    }).then(function (Student) {
        res.json(Student);
    });
}
/** 
 *  
*/
student.getStudents = function (req, res, next) {
    model.Student.findAll({
        include: [
            {
                model: model.User,
                as: "User"
            },
            {
                model: model.Section,
                as: "Class"
            }
        ]
    }).then(function (Students) {
        res.json(Students);
    });
}
module.exports = student;
