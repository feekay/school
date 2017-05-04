var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var section = {}
/** 
 *  
*/
section.addSection = function (req, res, next) {
    var post = req.body;
    model.Section.create({
        number: post.number
    }).then(function () {
        res.status = 201;
        res.send();
    });

}
/**
 * 
 */
section.getStudents = function (req, res, next) {

    var param = req.params;
    model.Section.find({
        where: {
            id: param.section
        },
        include: [
            { model: model.Student, as: "Students" }
        ]
    }).then(function (section) {
        res.json(section);
    });
}
/** 
 *  
*/
section.getActivities = function (req, res, next) {

    var param = req.params;
    model.Activity.find({
        where: {
            sectionId: param.section
        }
    }).then(function (Section) {
        res.json(Section);
    });
}

/** 
 *  
*/
section.addActivity = function (req, res, next) {
    var param = req.params;
    var post= req.body;
    model.Section.find({
        where: {
            id: param.section
        }
    }).then(function (Section) {
        model.Activity.create({
            date: post.date? new Date(post.date):null,
            description: post.description
        }).then(function (activity) {
            activity.setSection(Section);
            res.sendStatus(201);
        });
    });

}
/** 
 *  
*/
section.getSection = function (req, res, next) {
    var param = req.params;
    model.Section.find({
        where: {
            id: param.section
        }
    }).then(function (Section) {
        res.json(Section);
    });
}
/**
 * 
 */
section.getSections = function (req, res, next) {
    model.Section.findAll().then(function (Sections) {
        res.json(Sections);
    });
}
module.exports = section;
