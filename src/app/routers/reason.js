import { Router } from 'express';
import ReasonController from '../controllers/ReasonController';

const routes = new Router();

routes.get('/reason', ReasonController.index);

export default routes;
