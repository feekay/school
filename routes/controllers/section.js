var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");


var section ={}

section.addSection=function(req, res){
    var post=req.body;
    model.Section.create({
        number: post.number
    }).then(function(){
        res.status= 201;
        res.send();
    });

}

section.getActivities = function(req, res, next){
    
    var param = req.params;

    model.Activity.find({
        where:{
            sectionId: param.section
        }
    })
    .then(function(Section){
        res.json(Section);
    });
        
}

section.addActivity= function(req, res, next){
   

    model.Section.find({
        where:{
            id: param.section
        }
    })
    .then(function(Section){
        model.Activity.create({
            number: post.number
        }).then(function(activity){
            activity.setSection(Section);            
            res.sendStatus(201);
        });
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
