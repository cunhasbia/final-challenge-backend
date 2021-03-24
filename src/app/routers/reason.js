import { Router } from 'express';
import ReasonController from '../controllers/ReasonController';

const routes = new Router();

routes.get('/reason', ReasonController.index);
routes.get('/reason/:id', ReasonController.show);
routes.post('/reason', ReasonController.store);
routes.put('/reason/:id', ReasonController.update);
routes.delete('/reason/:id', ReasonController.delete);

export default routes;
