var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var user = {};
var user_params = {
    'firstname': 'string',
    'lastname': 'string',
    'gender': 'string',
    'dob': 'string'
}
/** 
 *  
*/
user.addUser = function (req, res, next) {
    var post = req.body;
    if (validator(user_params, body)) {
        model.User.create({
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null
        }).then(function () {
            res.status = constants.HTTP.CODES.CREATED;
            res.send();
        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    }
    else {
        res.status = constants.HTTP.CODES.BAD_REQUEST;
        req.send();
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
            res.status = constants.HTTP.CODES.NOT_FOUND;
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

        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
/** 
 *  
*/
user.login = function (req, res, next) {
    model.User.find({
        where: {
            username: post.username,
            password: post.password
        }
    }).then(function (user) {
        if (user) {
            res.status = constants.HTTP.CODES.SUCCESS;
            res.send();
            res.json({ token: "a" });
        }
        else {
            res.status = constants.HTTP.CODES.UNAUTHORIZED;
            res.json(responseHelper.formatResponse(constants.MESSAGE.LOGIN.AUTH_FAILED));
        }

    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;

}
module.exports = user;
