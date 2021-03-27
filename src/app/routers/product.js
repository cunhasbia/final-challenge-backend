import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import {
  invalidParams,
  isNumber,
  productData,
  isNumberCategory,
} from '../middlewares/refactor';

const routes = new Router();

routes.get('/product', invalidParams, ProductController.index);
routes.get('/product/:id', isNumber, invalidParams, ProductController.show);
routes.post('/product', productData, isNumberCategory, ProductController.store);
routes.put(
  '/product/:id',
  productData,
  isNumberCategory,
  isNumber,
  ProductController.update
);
routes.delete('/product/:id', isNumber, ProductController.delete);

export default routes;
