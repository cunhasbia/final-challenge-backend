require('dotenv').config();

const host = process.env.API_URL;
const user = require('../app/documentation/user');

module.exports = {
  info: {
    version: '1.0.0',
    title: 'API Documentation',
    description: 'My description',
  },
  host,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  defaultModelsExpandDepth: -1,
  securityDefinitions: {
    Bearer: {
      description: 'JWT Token',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  definitions: {
    user,
  },
};
