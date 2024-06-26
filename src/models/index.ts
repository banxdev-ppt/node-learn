import { Sequelize, DataTypes } from 'sequelize';
const config = require('../config/config.ts');

import UserFactory, { UserModelStatic } from './UserModal';

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  port: config.DB_PORT,
});

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: UserModelStatic;
}

const db: DbInterface = {
  sequelize,
  Sequelize,
} as DbInterface;

db.User = UserFactory(sequelize);

export default db;
