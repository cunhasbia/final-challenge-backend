import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const routes = new Router();

routes.get('/product', ProductController.index);
routes.get('/product/:id', ProductController.show);
routes.post('/product', ProductController.store);
// routes.put('/product/:id', ProductController.update);
// routes.delete('/product/:id', ProductController.delete);

export default routes;
