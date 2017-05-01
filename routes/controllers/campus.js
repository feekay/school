var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var campus = {};

var accountParams = {
    'amount': "number"
}

var classParams = {
    'amount': "number"
}
/** 
 *  
*/
campus.addAccount = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        if (validator(accountParams, post)) {
            model.Account.create({
                amount: post.amount
            }).then(function (acc) {
                acc.setCampus(campus);
                res.status = 201;
                res.send();
            });
        }
        else{
            res.sendStatus(400);
        }
    });
    ;
}
/** 
 *  
*/
campus.getAccounts = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        include: [
            {
                model: model.Account, as: "Accounts"
            }
        ],
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        res.json(campus.Accounts);
    });
    ;
}

/** 
 *  
*/
campus.addClass = function (req, res, next) {
    var post = req.body;
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        model.Class.create({
            name: post.name,
            fee: post.fee
        }).then(function (cls) {
            cls.setCampus(campus);
            res.status = 201;
            res.send();
        });
    });
    ;
}
/** 
 *  
*/
campus.getClasses = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        include: [
            {
                model: model.Class, as: "Classes"
            }
        ],
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        res.json(campus.Classes);
    });
    ;
}
/** 
 *  
*/
campus.addCampus = function (req, res, next) {
    var post = req.body;
    model.Campus.create({
        name: post.name,
        address: post.address
    }).then(function () {
        res.status = 201;
        res.send();
    });

}
/** 
 *  
*/
campus.getCampus = function (req, res, next) {
    var param = req.params;
    model.Campus.find({
        where: {
            id: param.campus
        }
    }).then(function (campus) {
        res.json(campus);
    });
}
/** 
 *  
*/
campus.getCampuses = function (req, res, next) {
    model.Campus.findAll().then(function (campuses) {
        res.json(campuses);
    });
}
module.exports = campus;
