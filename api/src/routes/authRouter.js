const express = require('express');

const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', authController.login);
// authRouter.get('/fb/login', authController.fb_login);
// authRouter.get('/fb/fail', authController.fb_fail);
// authRouter.get('/fb/logout', authController.fb_logout);

module.exports = authRouter;