const swaggerAutogen = require('swagger-autogen')();
const swaggerConfig = require('./config/swagger');

const outputFile = './src/swagger-documentation.json';
const endpoints = [
  './src/app/routers/user.js',
  './src/app/routers/auth.js',
  './src/app/routers/product.js',
];

swaggerAutogen(outputFile, endpoints, swaggerConfig);
