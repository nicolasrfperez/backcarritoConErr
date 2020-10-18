var express = require('express');
var router = express.Router();

var categoriesController = require("../controllers/categoriesController");

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);
router.delete('/:id', categoriesController.delete);
module.exports = router;