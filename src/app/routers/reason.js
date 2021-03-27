import { Router } from 'express';
import ReasonController from '../controllers/ReasonController';
import { invalidParams, isNumber } from '../middlewares/refactor';

const routes = new Router();

routes.get('/reason', invalidParams, ReasonController.index);
routes.get('/reason/:id', invalidParams, isNumber, ReasonController.show);

export default routes;
