const express = require('express');

const usersController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.get('/:id', usersController.show);
userRouter.post('/create', usersController.create);
userRouter.put('/:id/update', usersController.update);
userRouter.post('/:id/delete', usersController.delete);

module.exports = userRouter;
