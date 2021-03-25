import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const routes = new Router();

routes.get('/category', CategoryController.index);
// routes.get('/category/:id', CategoryController.show);
// routes.post('/category', CategoryController.store);
// routes.put('/category/:id', CategoryController.update);
// routes.delete('/category/:id', CategoryController.delete);

export default routes;
