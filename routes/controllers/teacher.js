var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var teacher = {}
/** 
 *  
*/
teacher.editTeacher = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Teacher.find({ where: { id: param.teacher } }).then(function (s) {
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

teacher.getCourses = function (req, res, next) {
    var param = req.params;
    model.Teaching.findAll({
        where: { TeacherId: param.teacher },
        include: [
            { model: model.Course,as:"Course"  },
            { model: model.Section,as:"Section"  },
        ]
    }).then(function (t) {
        res.json(t);
    });

};
/** 
 *  
*/
teacher.addCourse = function (req, res, next) {
    var param = req.params;
    var post=req.body;
    model.Teaching.create().then(function (t) {
        model.Teacher.find({ where: { id: param.teacher } }).then(function (teacher) {
            model.Section.find({ where: { id: post.sectionId } }).then(function (section) {
                model.Course.find({ where: { id: post.courseId } }).then(function (course) {
                    t.setTeacher(teacher);
                    t.setSection(section);
                    t.setCourse(course);
                    res.sendStatus(201);
                });
            });
        });
    });

};
/** 
 *  
*/
teacher.addTeacher = function (req, res, next) {
    var post = req.body;
    model.Teacher.create().then(function (s) {
        model.User.create({
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null
        })
            .then(function (user) {
                s.setUser(user);
            });

        res.status = 201;
        res.send();
    });

}
/** 
 *  
*/
teacher.getTeacher = function (req, res, next) {
    var param = req.params;

    model.Teacher.find({
        include: [
            {
                model: model.User,
                as: "User"
            },
            {
                model: model.Campus,
                as: "Campuses"
            }
        ],
        where: {
            id: param.teacher
        }
    }).then(function (Teacher) {
        res.json(Teacher);
    });

}
/** 
 *  
*/
teacher.getTeachers = function (req, res, next) {
    model.Teacher.findAll({
        include: [
            {
                model: model.User,
                as: "User"
            },
            {
                model: model.Campus,
                as: "Campuses"
            }
        ]
    }).then(function (Teachers) {
        res.json(Teachers);
    });

}
/** 
 *  
*/

module.exports = teacher;
