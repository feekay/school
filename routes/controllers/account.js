var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");

var account = {}
/** 
 *  
*/
account.getAccount = function (req, res, next) {
    var param = req.params;
    model.Account.find({
        where: {
            id: param.account
        }
    }).then(function (account) {
            res.json(account);
        });
        next();
}
/** 
 *  
*/
account.getAccounts = function (req, res, next) {
    model.Account.findAll().then(function (accounts) {
        res.json(accounts);
    });
    next();
}
module.exports = account;
