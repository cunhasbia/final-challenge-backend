import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const routes = new Router();

routes.get('/category', CategoryController.index);

export default routes;
