var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var cls = {}
/** 
 *  
*/
cls.getClass = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (Class) {
        res.json(Class);
    });
}
/** 
 *  
*/
cls.getClasses = function (req, res, next) {
    model.Class.findAll().then(function (Classes) {
        res.json(Classes);
    });
}
/** 
 *  
*/
cls.addCourse = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (Class) {
        model.Course.find({
            where: {
                id: post.courseId
            }
        }).then(function (Course) {
            Class.addCourse(Course);
            res.sendStatus(201);
        });
    });
    ;
}
/** 
 *  
*/
cls.getCourses = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        include: [
            { model: model.Course, as: "Courses" }
        ],
        where: {
            id: param.class
        }
    }).then(function (Class) {
        res.json(Class.Courses);
    });
}
/** 
 *  
*/
cls.addSection = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Class.find({
        where: {
            id: param.class
        }
    }).then(function (Class) {
        model.Section.create({
            number: post.number
        }).then(function (Course) {
            Class.addCourse(Course);
            res.sendStatus(201);
        });
    });
}
/** 
 *  
*/
cls.getSections = function (req, res, next) {
    var param = req.params;
    model.Class.find({
        include: [
            { model: model.Section, as: "Sections" }
        ],
        where: {
            id: param.class
        }
    }).then(function (Class) {
        res.json(Class.Sections);
    });
}

module.exports = cls;
