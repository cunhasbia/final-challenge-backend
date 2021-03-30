import { Router } from 'express';
import SaleReturnController from '../controllers/SaleReturnController';

const routes = new Router();

routes.get('/sale-return', SaleReturnController.index);
routes.get('/sale-return/:id', SaleReturnController.show);
routes.post('/sale-return', SaleReturnController.store);

export default routes;
