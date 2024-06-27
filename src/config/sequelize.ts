import { Sequelize } from 'sequelize';
const config = require('./config');

export const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  port: config.PORT,
  logging: console.log,
});
