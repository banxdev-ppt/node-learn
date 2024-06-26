import { Sequelize, DataTypes } from 'sequelize';
import UserFactory, { UserModelStatic } from './UserModal';
const config = require('../config/config');

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT as any,
  port: config.DB_PORT,
});

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  user: UserModelStatic;
}

const db: DbInterface = {
  sequelize,
  Sequelize,
} as DbInterface;

db.user = UserFactory(sequelize);

export default db;
