var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController")
/* GET users listing. */
router.post('/registro', usersController.create)
router.post('/login', usersController.validate)

module.exports = router;
