import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Product from '../app/models/Product';
import Category from '../app/models/Category';
import Reason from '../app/models/Reason';
import Sale from '../app/models/Sale';
import StockNear from '../app/models/StockNear';
import SaleReturn from '../app/models/SaleReturn';
import Stock from '../app/models/Stock';
import StockProduct from '../app/models/StockProduct';

const models = [
  Product,
  Category,
  Stock,
  Reason,
  Sale,
  StockNear,
  SaleReturn,
  StockProduct,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (process.env.NODE_ENV === 'test') {
      this.connection = new Sequelize({
        dialect: databaseConfig.dialect,
        storage: databaseConfig.storage,
        define: databaseConfig.define,
      });
    } else {
      this.connection = new Sequelize(databaseConfig);
    }

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
