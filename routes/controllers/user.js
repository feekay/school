var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var user ={};

user.addUser = function(req, res, next){
    var post=req.body;
    model.User.create({
        firstname: post.firstname,
        lastname: post.lastname,
        gender: post.gender,
        dob: post.dob ? new Date(post.dob):null
    }).then(function(){
        res.status= 201;
        res.send();
    });
}
user.getUser =function(req, res, next){
    var param = req.params;

    model.User.find({
        where:{
            id: param.user
        }
    })
    .then(function(User){
        res.json(User);
    });
}
user.getUsers=function(req, res, next){
    model.User.findAll().then(function(Users){
        //Logic
       // res.append
       res.json(Users);
    });
}

user.login=function(req, res, next){
    model.User.find({
        where: {
            username: post.username,
            password:post.password
        }
    }).then(function(user){
        if(user){
            res.json({token:"a"});
        }
        else{
            res.json(responseHelper.formatResponse(constants.MESSAGE.LOGIN.AUTH_FAILED));
        }

    });
}
module.exports = user;
