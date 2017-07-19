var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");
var bcrypt = require('bcrypt');


var student = {};
var student_params = {};
/** 
 *  
*/
student.editStudent = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Student.find({ where: { id: param.student } })
        .then(function (s) {
            if (s) {
                s.updateAttributes({
                    firstname: post.firstname ? post.firstname : s.firstname,
                    lastname: post.lastname ? post.lastname : s.lastname,
                    gender: post.gender ? post.gender : s.gender,
                    dob: post.dob ? new Date(post.dob) : s.dob
                });
                res.status( constants.HTTP.CODES.CREATED);
                res.send();
            }
            else {
                res.status( constants.HTTP.CODES.NOT_FOUND);
                res.send();
            }
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });

}
/**
 * 
 */
student.deleteStudent = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Student.destroy({ where: { id: param.student } })
        .then(function (s) {
            res.status( constants.HTTP.CODES.SUCCESS);
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });

}
/** 
 *  
*/
student.addStudent = function (req, res, next) {
    var post = req.body;
    if (validator(student_params, post)) {
        model.Student.create().then(function (s) {
            model.User.create({
                username:post.username,
                firstname: post.firstname,
                lastname: post.lastname,
                gender: post.gender,
                dob: post.dob ? new Date(post.dob) : null,
                password: bcrypt.hashSync(post.password, 10)

            }).then(function (user) {
                s.setUser(user);
            });
            res.status( constants.HTTP.CODES.CREATED);
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    }
    else {
        res.status( constants.HTTP.CODES.BAD_REQUES);
        res.send();
    }
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
                as: "Section"
            }
        ],
        where: {
            id: param.student
        }
    }).then(function (student) {
        if (student) {
            res.status( constants.HTTP.CODES.SUCCESS);
            res.json(student);
        } else {
            res.status( constants.HTTP.CODES.BAD_REQUEST);
            res.send();
        }
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
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
                as: "Section"
            }
        ]
    }).then(function (students) {
        res.status( constants.HTTP.CODES.SUCCESS);
        res.json(students);
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
module.exports = student;
