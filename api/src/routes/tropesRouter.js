const express = require('express');

const tropesController = require('../controllers/tropesController');

const tropesRouter = express.Router();

tropesRouter.get('/', tropesController.index);
tropesRouter.get('/:id', tropesController.show);
tropesRouter.post('/create', tropesController.create);
tropesRouter.put('/:id/update', tropesController.update);
tropesRouter.post('/:id/delete', tropesController.delete);

module.exports = tropesRouter;
