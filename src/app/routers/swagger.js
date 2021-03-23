import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocumentation from '../../swagger-documentation.json';

const routes = new Router();

routes.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocumentation)
);

export default routes;
