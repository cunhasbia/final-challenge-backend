import { Router } from 'express';
import StockController from '../controllers/StockController';
import { isNumber } from '../middlewares/refactor';

const routes = new Router();

routes.get('/stock', StockController.index);
routes.get('/stock/:id', isNumber, StockController.show);
routes.post('/stock', StockController.store);

export default routes;
