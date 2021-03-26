import { Router } from 'express';
import StockController from '../controllers/StockController';

const routes = new Router();

routes.get('/stock', StockController.index);

export default routes;
