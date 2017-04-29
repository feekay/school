var express = require('express');
var router = express.Router();
var model = require('../models');
var account = require('./controllers/account');

router.params("account", function (req, res, next, student) {
    
});
/* GET <META>  listing. */
router.get('/', account.getAccounts);
/* GET <META>. */
router.get('/:account/', account.getAccount);
/* Add <META>. */
router.post('/', account.addAccount);

module.exports = router;
