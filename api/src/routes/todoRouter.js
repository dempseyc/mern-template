const express = require('express')

// const usersController = require('../controllers/usersController')
const todosController = require('../controllers/todosController')

const todoRouter = express.Router()

todoRouter.get('/', todosController.index)
todoRouter.get('/:id', todosController.show)
todoRouter.post('/create', todosController.create)
todoRouter.post('/:id/update', todosController.update)
todoRouter.post('/:id/delete', todosController.delete)

module.exports = todoRouter