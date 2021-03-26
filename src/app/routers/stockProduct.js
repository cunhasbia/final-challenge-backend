import { Router } from 'express';
import StockProductController from '../controllers/StockProductController';

const routes = new Router();

routes.get('/stock-product', StockProductController.index);
routes.get('/stock-product/:id', StockProductController.show);
routes.post('/stock-product', StockProductController.store);
routes.put('/stock-product/:id', StockProductController.update);
routes.delete('/stock-product/:id', StockProductController.delete);

export default routes;
