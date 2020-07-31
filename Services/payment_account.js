const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./user');


const Model = Sequelize.Model;
class PaymentAccount extends Model {
    static async findByAccountNumber(account_number) {
        return PaymentAccount.findByPk(account_number);
    }
}

PaymentAccount.init(
    {
        account_number: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        issue_date: {
            type: Sequelize.DATE,
        },
        balance: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        currency: {
            type: Sequelize.STRING,
            allownull: false,
        },
        transger_limit: {
            type: Sequelize.DOUBLE,
            allownull: false,
        },
        // account_id: {
        //   type: Sequelize.INTEGER,
        //   references: { model: account, key: 'account_id' },
        // },
        // status_id: {
        //   type: Sequelize.INTEGER,
        //   references: { model: status, key: 'status_id' },
        // },
    },
    {
        sequelize: db,
        modelName: 'payment',
    }
);

User.hasMany(PaymentAccount)
PaymentAccount.belongsTo(User)

module.exports = PaymentAccount;
