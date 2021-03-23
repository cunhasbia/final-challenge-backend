import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Product from '../app/models/Product';
import Category from '../app/models/Category';
import Region from '../app/models/Region';
import Sales from '../app/models/Sales';
import RegionNear from '../app/models/RegionNear';
import SalesReturn from '../app/models/SalesReturn';
import ReturnReasons from '../app/models/ReturnReasons';
import Inventory from '../app/models/Inventory';

const models = [
  Product,
  Category,
  Region,
  Sales,
  RegionNear,
  SalesReturn,
  ReturnReasons,
  Inventory,
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
