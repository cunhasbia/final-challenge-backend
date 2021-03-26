import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Product from '../app/models/Product';
import StockProduct from '../app/models/StockProduct';
import Category from '../app/models/Category';
import Reason from '../app/models/Reason';
import Sale from '../app/models/Sale';
import StockNearby from '../app/models/StockNearby';
import SaleReturn from '../app/models/SaleReturn';
import Stock from '../app/models/Stock';

const models = [
  Product,
  Category,
  Stock,
  Reason,
  Sale,
  StockNearby,
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
