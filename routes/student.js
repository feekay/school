var express = require('express');
var router = express.Router();
var model = require('../models');
var student = require('./controllers/student');

router.param("student", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', student.getStudents);
/* GET <META>. */
router.get('/:student/', student.getStudent);
/* Add <META>. */
router.post('/', student.addStudent);

module.exports = router;
