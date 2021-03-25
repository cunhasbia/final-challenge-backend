import { Router } from 'express';
import SaleReturnController from '../controllers/SaleReturnController';

const routes = new Router();

routes.get('/saleReturn', SaleReturnController.index);
routes.get('/saleReturn/:id', SaleReturnController.show);
routes.post('/saleReturn', SaleReturnController.store);
// routes.put('/saleReturn/:id', SaleReturnController.update);
// routes.delete('/saleReturn/:id', SaleReturnController.delete);

export default routes;
