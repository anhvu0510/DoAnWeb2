const Sequelize = require('sequelize');
const db = require('./db');
const Payment = require('./payment_account');

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
    }
  },
  {
    sequelize: db,
    modelName: 'transaction',
  }
);

Transaction.belongsTo(Payment, { constraints: false, foreignKey: "SourceID" });
Transaction.belongsTo(Payment, { constraints: false, foreignKey: "DestinationID" });

module.exports = Transaction;
