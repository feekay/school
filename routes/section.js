var express = require('express');
var router = express.Router();
var model = require('../models');
var section = require('./controllers/section');

router.param("section", function (req, res, next, section) {
    next();
});
/* GET <META>  listing. */
router.get('/', section.getSections);
/* GET <META>. */
router.get('/:section/', section.getSection);
router.get('/:section/teachers', section.getTeaching);

router.get('/:section/courses',section.getCourses);
router.get('/:section/students', section.getStudents);
router.post('/:section/students', section.addStudent);
router.get('/:section/activities', section.getActivities);
router.post('/:section/activities', section.addActivity);

/* Add <META>. */
router.post('/', section.addSection);

module.exports = router;
