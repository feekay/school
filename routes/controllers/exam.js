var model = require('../../models');
var validator=  require('../../helpers/validate');
var requestHelper = require("../../helpers/request");
var constants = require("../../config/constants");
var responseHelper = require("../../helpers/response");



var exam ={}

exam.addExam=function(req, res){
    var post=req.body;
    model.Exam.create({
        time: post.time
    }).then(function(){
        res.status= 201;
        res.send();
    });
}
exam.getExam=function(req, res){
    var param = req.params;

    model.Exam.find({
        where:{
            id: param.exam
        }
    })
    .then(function(Exam){
        res.json(Exam);
    });
}
exam.getExams=function(req, res){
    model.Exam.findAll().then(function(Exams){
        //Logic
       // res.append
       res.json(Exams);
    });
}


module.exports = exam;
