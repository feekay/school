var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var course = {}
/** 
 *  
*/
course.addCourse = function (req, res, next) {
    var post = req.body;
    model.Course.create({
        name: post.name
    }).then(function () {
        res.status = 201;
        res.send();
    });

}
/** 
 *  
*/
course.getCourse = function (req, res, next) {
    var param = req.params;
    model.Course.find({
        where: {
            id: param.course
        }
    }).then(function (Course) {
        res.json(Course);
    });
}
/** 
 *  
*/
course.getCourses = function (req, res, next) {
    model.Course.findAll().then(function (Courses) {
        res.json(Courses);
    });
}
course.getTeaching = function (req, res, next) {
    param = req.params;
    model.Teaching.findAll({
        where: { courseId: param.id },
        include: [
            { model: model.Teacher, as:"Teacher" },
            { model: model.Section, as:"Section" }
        ]
    }).then(function (teaching) {
        res.json(teaching);
    })

}

module.exports = course;
