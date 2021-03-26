import { Router } from 'express';
import StockProductController from '../controllers/StockProductController';

const routes = new Router();

routes.get('/stock-product', StockProductController.index);

export default routes;
