require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASS } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: 'admin-panel_development',
    host: DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: 'admin-panel_test',
    host: DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: 'admin-panel_production',
    host: DB_HOST,
    dialect: 'mysql',
  },
};
