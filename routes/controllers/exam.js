var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");



var exam = {};
var exam_params = {
    "teachingId": "string",
    "time": "date",
};
/** 
 *  
*/
exam.addExam = function (req, res, next) {
    var post = req.body;
    if (validator(exam_params, post)) {
        model.Teaching.find({
            where: {
                id: post.teachingId
            }
        }).then(function (teaching) {
            model.Exam.create({
                time: post.time
            }).then(function (exam) {
                exam.setCourse(teaching);
                res.status(constants.HTTP.CODES.CREATED);
                res.send();
            });
        })

    } else {
        res.status(constants.HTTP.CODES.NOT_FOUND);
        res.send();
    }

}
/** 
 *  
*/
exam.getExam = function (req, res, next) {
    var param = req.params;
    model.Exam.find({
        where: {
            id: param.exam
        },
        include: [{ model: model.Teaching, as: "Course" }]
    }).then(function (exam) {
        if (exam) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(exam);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    });

}
/** 
 *  
*/
exam.getExams = function (req, res, next) {
    model.Exam.findAll().then(function (exams) {
        res.status(constants.HTTP.CODES.SUCCESS);
        res.json(exams);
    });
}


module.exports = exam;
