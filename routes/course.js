var express = require('express');
var router = express.Router();
var model = require('../models');
var course = require('./controllers/course');

router.params("course", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', course.getCourses);
/* GET <META>. */
router.get('/:course/', course.getCourse);
/* Add <META>. */
router.post('/', course.addCourse);

module.exports = router;
