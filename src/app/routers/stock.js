import { Router } from 'express';
import StockController from '../controllers/StockController';

const routes = new Router();

routes.get('/stock', StockController.index);
routes.get('/stock/:id', StockController.show);

export default routes;
