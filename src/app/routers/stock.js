import { Router } from 'express';
import StockController from '../controllers/StockController';
import { invalidParams, isNumber } from '../middlewares/refactor';

const routes = new Router();

routes.get('/stock', StockController.index);
routes.get('/stock/:id', invalidParams, isNumber, StockController.show);

export default routes;
