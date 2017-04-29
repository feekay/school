var express = require('express');
var router = express.Router();
var model = require('../models');
var cls = require('./controllers/class');

router.params("class", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', cls.getClasses);
/* GET <META>. */
router.get('/:class/', cls.getClass);
/* Add <META>. */
router.post('/', cls.addClass);

module.exports = router;
