var express = require('express');
var router = express.Router();
var model = require('../models');
var student = require('./controllers/student');

router.param("student", function (req, res, next, student) {
    next();
});
/* GET <META>  listing. */
router.get('/', student.getStudents);
/* GET <META>. */
router.get('/:student/', student.getStudent);
router.put('/:student/', student.editStudent);
router.delete('/:student/', student.deleteStudent);
/* Add <META>. */
router.post('/', student.addStudent);

module.exports = router;
