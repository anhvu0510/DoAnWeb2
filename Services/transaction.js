const Sequelize = require('sequelize');
const db = require('./db');
const checkingaccount = require('./checkingaccount');

const Model = Sequelize.Model;
class Transaction extends Model {
  static async findById(transcation_id) {
    return Transaction.findByPk(transcation_id);
  }
}

Transaction.init(
  {
    transcation_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allownull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    source_account: {
      type: Sequelize.STRING,
      references: { model: checkingaccount, key: 'account_number' },
    },
    destination_account: {
      type: Sequelize.STRING,
      references: { model: checkingaccount, key: 'account_number' },
    },
  },
  {
    sequelize: db,
    modelName: 'transaction',
  }
);

module.exports = Transaction;
