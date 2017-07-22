var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");
var bcrypt = require('bcrypt');


var staff = {};
var staff_params = {};
/** 
 *  
*/
staff.editStaff = function (req, res, next) {
    var post = req.body;
    var param = req.params;

    model.Staff.find({ where: { id: param.staff } }).then(function (s) {
        s.updateAttributes({
            firstname: post.firstname ? post.firstname : s.firstname,
            lastname: post.lastname ? post.lastname : s.lastname,
            gender: post.gender ? post.gender : s.gender,
            dob: post.dob ? new Date(post.dob) : s.dob
        });
        res.status(constants.HTTP.CODES.CREATED);
        res.send();
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });;

}
/** 
 *  
*/
staff.addStaff = function (req, res, next) {
    var post = req.body;
    if (validator(staff_params, post)) {
        model.User.create({
            username: post.username,
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null,
            password: bcrypt.hashSync(post.password, 10)
        }).then(function (user) {
            model.Staff.create().then(function (s) {
                s.setUser(user);
                res.status(constants.HTTP.CODES.CREATED);
                res.send();
            });

        }).catch(function (err) {
            res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
        });
    } else {
        res.status(constants.HTTP.CODES.BAD_REQUEST);
        res.send();
    }

}
/** 
 *  
*/
staff.getStaff = function (req, res, next) {
    var param = req.params;

    model.Staff.find({
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
            id: param.staff
        }
    }).then(function (staff) {
        if (staff) {
            res.status(constants.HTTP.CODES.SUCCESS);
            res.json(staff);
        }
        else {
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
staff.getStaffs = function (req, res, next) {
    model.Staff.findAll({
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
    }).then(function (staffs) {
        res.status(constants.HTTP.CODES.SUCCESS);
        res.json(staffs);
    }).catch(function (err) {
        res.sendStatus(constants.HTTP.CODES.SERVER_ERROR);
    });
}
module.exports = staff;
