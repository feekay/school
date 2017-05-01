var model = require('../../models');
var validator = require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var staff = {}
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
        res.status = 201;
        res.send();
    });
    
}
/** 
 *  
*/
staff.addStaff = function (req, res, next) {
    var post = req.body;
    model.Staff.create().then(function (s) {
        model.User.create({
            firstname: post.firstname,
            lastname: post.lastname,
            gender: post.gender,
            dob: post.dob ? new Date(post.dob) : null
        }).then(function (user) {
            s.setUser(user);
        });

        res.status = 201;
        res.send();
    });
    
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
    }).then(function (Staff) {
        res.json(Staff);
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
    }).then(function (Staffs) {
        res.json(Staffs);
    });
}
module.exports = staff;
