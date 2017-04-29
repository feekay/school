var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var staff ={}

staff.addStaff=function(req, res){
    model.Staff.create()
    .then(function(s){
        model.User.create({
        firstname: post.firstname,
        lastname: post.lastname,
        gender: post.gender,
        dob: post.dob ? new Date(post.dob):null
        })
        .then(function(user){
            s.setUser(user);
        });

        res.status= 201;
        res.send();
    });
}
staff.getStaff=function(req, res){
    var param = req.params;

    model.Staff.find({
        where:{
            id: param.staff
        }
    })
    .then(function(Staff){
        res.json(Staff);
    });
}
staff.getStaffs=function(req, res){
    model.Staff.findAll().then(function(Staffs){
        //Logic
       // res.append
       res.json(Staffs);
    });
}


module.exports = staff;
