/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved

function invalidParams(request, response, next) {
  const { page, limit } = request.query;

  if (!page || !limit) {
    return response.status(400).json({ message: 'Invalid params' });
  }

  next();
}

function isNumber(request, response, next) {
  const { id } = request.params;
  const parsed = Number.parseInt(id);

  if (Number.isNaN(parsed)) {
    return response.status(400).json({ message: 'Invalid ID' });
  }

  next();
}

function productData(request, response, next) {
  const { name, price, category_id } = request.body;

  if (!name || !price || !category_id) {
    return response.status(400).json({ message: 'Invalid data' });
  }

  next();
}

function isNumberCategory(request, response, next) {
  const { category_id } = request.body;

  const parsed = Number.parseInt(category_id);

  if (Number.isNaN(parsed)) {
    return response.status(400).json({ message: 'Invalid ID' });
  }

  next();
}

function stockProductData(request, response, next) {
  const { quantity, product_id, stock_id } = request.body;

  if (!quantity || !product_id || !stock_id) {
    return response.status(400).json({ message: 'Invalid data' });
  }

  next();
}

function isProductNumber(request, response, next) {
  const { product_id } = request.body;

  const parsedProduct = Number.parseInt(product_id);

  if (Number.isNaN(parsedProduct)) {
    return response.status(400).json({ message: 'Invalid ID' });
  }

  next();
}

function isStockNumber(request, response, next) {
  const { stock_id } = request.body;

  const parsedStock = Number.parseInt(stock_id);

  if (Number.isNaN(parsedStock)) {
    return response.status(400).json({ message: 'Invalid ID' });
  }

  next();
}

export {
  invalidParams,
  isNumber,
  productData,
  isNumberCategory,
  stockProductData,
  isProductNumber,
  isStockNumber,
};
