var express = require('express');
var router = express.Router();
var model = require('../models');
var cls = require('./controllers/class');

router.param("class", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', cls.getClasses);
/* GET <META>. */
router.get('/:class/', cls.getClass);
/* Add <META>. */
router.post('/', cls.addClass);

router.get('/:class/courses', cls.getCourses);
router.post('/:class/courses', cls.addCourse);
module.exports = router;
