var express = require('express');
var router = express.Router();
var model = require('../models');
var user = require('./controllers/user');


/* GET users listing. */
router.get('/', user.getUsers);

/* Add user. */
router.post('/', user.addUser);

module.exports = router;
