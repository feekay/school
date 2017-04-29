var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var campus ={};

campus.addCampus=function(req, res){
    model.Campus.create({
        name: post.name,
        address:post.address
    }).then(function(){
        res.status= 201;
        res.send();
    });

}
campus.getCampus=function(req, res){
    var param = req.params;

    model.Campus.find({
        where:{
            id: param.campus
        }
    })
    .then(function(campus){
        res.json(campus);
    });
}
campus.getCampuses=function(req, res){
    model.Campus.findAll().then(function(campuses){
        //Logic
       // res.append
       res.json(campuses);
    });
}


module.exports = campus;
