var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var superSecret = constants.SECRET.superSecret;


var user = {};
var user_params = {
    'username': 'string',
    'firstname': 'string',
    'lastname': 'string',
    'gender': 'string',
    'dob': 'string',
    'password': 'string',
}
/** 
 *  
*/
user.addUser = function (req, res, next) {
    var post = req.body;
    if (validator(user_params, post)) {
        model.User.create({
            username: post.username,
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null,
            password: bcrypt.hashSync(post.password, 10)
        }).then(function (user) {
            res.status(constants.HTTP.CODES.CREATED);
            res.send();
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    }
    else {
        res.status(constants.HTTP.CODES.BAD_REQUEST);
        res.send();
    }
}
/** 
 *  
*/
user.getUser = function (req, res, next) {
    var param = req.params;
    model.User.find({
        where: {
            id: param.user
        }
    }).then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.status(constants.HTTP.CODES.NOT_FOUND);
            res.send();
        }
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/** 
 *  
*/
user.getUsers = function (req, res, next) {
    model.User.findAll().then(function (users) {
        res.json(users);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/** 
 *  
*/
user.login = function (req, res) {
    var post = req.body;
    model.User.find({
        where: {
            username: post.username
        }
    }).then(function (user) {
        if (user) {
            if (bcrypt.compareSync(post.password, user.password)) {
                res.status(constants.HTTP.CODES.SUCCESS);
                var token = jwt.sign({ username: user.username, password: user.password }, superSecret);
                getPermission(user).then(function (permission) {
                    res.json({ token: token, permission: permission });
                });
            }
            else {
                res.status(constants.HTTP.CODES.UNAUTHORIZED);
                res.json(responseHelper.formatResponse(constants.MESSAGES.LOGIN.AUTH_FAILED));
            }

        }
        else {
            res.status(constants.HTTP.CODES.UNAUTHORIZED);
            res.json(responseHelper.formatResponse(constants.MESSAGES.LOGIN.AUTH_FAILED));
        }

    }).catch(function (err) {
        console.log(err);
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });

}
function getPermission(user) {
    //this={}
    this.permission = "";
    return user.getStudent().then(function (student) {
        if (student) {
            return this.permission = "student";
        }
        else {
            return user.getTeacher().then(function (teacher) {
                if (teacher) {
                    return this.permission = "teacher";
                }
                else {
                    return user.getStaff().then(function (staff) {
                        if (staff) {
                            this.permission = "staff";
                        }
                        else {
                            this.permission = "admin";
                        }
                        return this.permission;
                    }.bind(this));
                }
            }.bind(this));
        }

    }.bind(this));
}
module.exports = user;
