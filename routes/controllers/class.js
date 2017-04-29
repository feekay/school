var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var cls ={}

cls.addClass=function(req, res){
    model.Class.create({
        name: post.name,
        fee:post.fee
    }).then(function(){
        res.status= 201;
        res.send();
    });

}
cls.getClass=function(req, res){
    var param = req.params;

    model.Class.find({
        where:{
            id: param.class
        }
    })
    .then(function(Class){
        res.json(Class);
    });
}
cls.getClasses=function(req, res){
    model.Class.findAll().then(function(Classes){
        //Logic
       // res.append
       res.json(Classes);
    });
}



module.exports = cls;
