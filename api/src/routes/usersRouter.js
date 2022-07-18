const express = require('express');

const usersController = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/:id', usersController.show);
usersRouter.post('/create', usersController.create);
usersRouter.put('/:id/update', usersController.update);
usersRouter.post('/:id/delete', usersController.delete);

module.exports = usersRouter;
