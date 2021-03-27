import { Router } from 'express';
import StockProductController from '../controllers/StockProductController';
import {
  invalidParams,
  isNumber,
  stockProductData,
  isProductNumber,
  isStockNumber,
} from '../middlewares/refactor';

const routes = new Router();

routes.get('/stock-product', invalidParams, StockProductController.index);
routes.get('/stock-product/:id', isNumber, StockProductController.show);
routes.post(
  '/stock-product',
  stockProductData,
  isProductNumber,
  isStockNumber,
  StockProductController.store
);
routes.put(
  '/stock-product/:id',
  isProductNumber,
  isStockNumber,
  StockProductController.update
);
routes.delete('/stock-product/:id', isNumber, StockProductController.delete);

export default routes;
