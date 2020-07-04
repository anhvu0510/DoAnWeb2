const Sequelize = require("sequelize");

const myStringConect = "postgres://postgres:postgres@localhost:5432/BankingSystem"

const connectionString =
  process.env.DATABASE_URL || myStringConect
  // "postgres://postgres:root@localhost:5432/BankingSystem"; 
const db = new Sequelize(connectionString);

module.exports = db;
