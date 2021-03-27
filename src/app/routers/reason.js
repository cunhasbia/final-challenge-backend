import { Router } from 'express';
import ReasonController from '../controllers/ReasonController';

const routes = new Router();

routes.get('/reason', ReasonController.index);
routes.get('/reason/:id', ReasonController.show);

export default routes;
