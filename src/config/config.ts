require('dotenv').config();

module.exports = {
  DATABASE: process.env.DB_NAME || 'authen-node-ts',
  USERNAME: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASS || '',
  HOST: process.env.DB_HOST || 'localhost',
  DIALECT: process.env.DB_DIALECT || 'mysql',
  SECRET_KEY: process.env.SECRET_KEY || 'hugcode',
  PORT: process.env.DB_PORT || 3306,
};
