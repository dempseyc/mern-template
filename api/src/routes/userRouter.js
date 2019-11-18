const express = require('express');

const usersController = require('../controllers/usersController');
const actsController = require('../controllers/actsController');
const contactsController = require('../controllers/contactsController');

const userRouter = express.Router();

userRouter.get('/:id', usersController.show);
userRouter.post('/create', usersController.create);
userRouter.put('/:id/update', usersController.update);

userRouter.get('/acts', actsController.index);
userRouter.post('/acts/create', actsController.create);
userRouter.put('/acts/:id/update', actsController.update);

userRouter.get('/contacts', contactsController.index);
userRouter.post('/contacts/create', contactsController.create);
userRouter.put('/contacts/:id/update', contactsController.update);
userRouter.put('/contacts/:id/delete', contactsController.delete);

module.exports = userRouter;
