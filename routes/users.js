var express = require('express');
var router = express.Router();
var model = require('../models');
var user = require('./controllers/user');
var auth = require('../helpers/auth');

/* GET users listing. */
router.get('/',auth, user.getUsers);

/* Add user. */
router.post('/', user.addUser);
router.post('/login', user.login);
router.get('/status',auth,function(req,res){return res.sendStatus(200);});
module.exports = router;
