var express = require('express');
var router = express.Router();
var controller = require('../controller/todoController.js');

router.get('/', controller.getAllTodos);
router.post('/', controller.createTodo);
router.put('/',controller.updateTodo);
router.delete('/:id', controller.deleteTodo);
router.delete('/clear', controller.removeAll);

module.exports = router;