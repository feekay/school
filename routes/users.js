var express = require('express');
var router = express.Router();
var model = require('../models');
var user = require('./controllers/user');
var auth = require('../helpers/auth');

/* GET users listing. */
router.get('/',auth, user.getUsers);

/* Add user. */
router.post('/', auth, user.addUser);

module.exports = router;
