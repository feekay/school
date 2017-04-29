var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var section ={}

section.addSection=function(req, res){

    model.Section.create({
        number: post.number
    }).then(function(){
        res.status= 201;
        res.send();
    });

}
section.getSection=function(req, res){
    var param = req.params;

    model.Section.find({
        where:{
            id: param.section
        }
    })
    .then(function(Section){
        res.json(Section);
    });
}
section.getSections=function(req, res){
    model.Section.findAll().then(function(Sections){
        //Logic
       // res.append
       res.json(Sections);
    });
}


module.exports = section;
