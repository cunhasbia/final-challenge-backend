import { Router } from 'express';
import SaleController from '../controllers/SaleController';

const routes = new Router();

routes.get('/sale', SaleController.index);
routes.get('/sale/:id', SaleController.show);
routes.post('/sale', SaleController.store);

export default routes;
