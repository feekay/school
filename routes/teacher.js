var express = require('express');
var router = express.Router();
var model = require('../models');
var teacher = require('./controllers/teacher');

router.param("teacher", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', teacher.getTeachers);
/* GET <META>. */
router.get('/:teacher/', teacher.getTeacher);
/* Add <META>. */
router.post('/', teacher.addTeacher);

router.get('/:teacher/classes', teacher.getClasses);
router.post('/:teacher/classes', teacher.addCourse);
module.exports = router;
