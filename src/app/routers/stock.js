import { Router } from 'express';
import StockController from '../controllers/StockController';

const routes = new Router();

routes.get('/stock', StockController.index);
routes.post('/stock', StockController.store);

export default routes;
