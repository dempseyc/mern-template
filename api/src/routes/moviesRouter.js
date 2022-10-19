const express = require('express');

const moviesController = require('../controllers/moviesController');

const moviesRouter = express.Router();

moviesRouter.get('/', moviesController.index);
moviesRouter.post('/search', moviesController.search);
moviesRouter.post('/create', moviesController.create);
moviesRouter.get('/:id', moviesController.show);
moviesRouter.patch('/:id/update', moviesController.update);
moviesRouter.post('/:id/delete', moviesController.delete);

module.exports = moviesRouter;