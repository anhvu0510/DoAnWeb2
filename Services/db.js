const Sequelize = require("sequelize");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:root@localhost:5432/BankingSystem";
const db = new Sequelize(connectionString);

module.exports = db;
