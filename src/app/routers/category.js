import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import { invalidParams, isNumber } from '../middlewares/refactor';

const routes = new Router();

routes.get('/category', invalidParams, CategoryController.index);
routes.get('/category/:id', invalidParams, isNumber, CategoryController.show);
routes.post('/category', CategoryController.store);

export default routes;
