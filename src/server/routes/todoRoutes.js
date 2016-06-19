var express = require('express');
var router = express.Router();
var controller = require('../controller/todoController.js');

router.get('/', controller.getAllTodos);
router.post('/', controller.createTodo);
router.put('/',controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;