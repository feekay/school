var express = require('express');
var router = express.Router();
var model = require('../models');
var campus = require('./controllers/campus');

router.param("campus", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', campus.getCampuses);
/* GET <META>. */
router.get('/:campus/', campus.getCampus);

router.get('/:campus/classes', campus.getCampus);
/* Add <META>. */
router.post('/', campus.addCampus);

module.exports = router;
