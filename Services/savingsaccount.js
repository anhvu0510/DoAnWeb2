const Sequelize = require('sequelize');
const db = require('./db');
const account = require('./account');
const status = require('./status');

const Model = Sequelize.Model;
class SavingsAccount extends Model {
  static async findByAccountNumber(account_number) {
    return SavingsAccount.findByPk(account_number);
  }
}

SavingsAccount.init(
  {
    account_number: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    issue_date: {
      type: Sequelize.DATEONLY,
    },
    funds: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allownull: false,
    },
    interest_rate: {
      type: Sequelize.DECIMAL,
      allownull: false,
    },
    term: {
      type: Sequelize.INTEGER,
      allownull: false,
    },
    closing_date: {
      type: Sequelize.DATEONLY,
      allownull: false,
    },
    account_id: {
      type: Sequelize.INTEGER,
      references: { model: account, key: 'account_id' },
    },
    status_id: {
      type: Sequelize.INTEGER,
      references: { model: status, key: 'status_id' },
    },
  },
  {
    sequelize: db,
    modelName: 'savingsaccount',
  }
);

module.exports = SavingsAccount;
