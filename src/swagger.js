const swaggerAutogen = require('swagger-autogen')();
const swaggerConfig = require('./config/swagger');

const outputFile = './src/swagger-documentation.json';
const endpoints = [
  './src/app/routers/category.js',
  './src/app/routers/product.js',
  './src/app/routers/reason.js',
  './src/app/routers/sale.js',
  './src/app/routers/saleReturn.js',
  './src/app/routers/stock.js',
  './src/app/routers/stockProduct.js',
];

swaggerAutogen(outputFile, endpoints, swaggerConfig);
