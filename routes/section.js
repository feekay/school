var express = require('express');
var router = express.Router();
var model = require('../models');
var section = require('./controllers/section');

router.params("section", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', section.getSections);
/* GET <META>. */
router.get('/:section/', section.getSection);
/* Add <META>. */
router.post('/', section.addSection);

module.exports = router;
