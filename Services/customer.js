const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./user');

const Model = Sequelize.Model;
class Customer extends Model {
    static async findById(user_id) {
        return Customer.findByPk(user_id);
    }
    static async findByPhoneNumber(phone_number) {
        return Customer.findOne({
            where: { phone_number },
        });
    }
    static async findByEmail(email) {
        return Customer.findOne({
            where: { email },
        });
    }
    static async findByIdCard(id_card) {
        return Customer.findOne({
            where: { id_card },
        });
    }
}

Customer.init(
    {
        id_customer: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        DOB: {
            type: Sequelize.DATEONLY,
        },
        gender: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        id_card: {
            type: Sequelize.INTEGER,
        },
        issue_date_for_id_card: {
            type: Sequelize.DATEONLY,
        },
        id_card_front_side_photo: {
            type: Sequelize.STRING.BINARY,
        },
        id_card_back_side_photo: {
            type: Sequelize.STRING.BINARY,
        },
        // user_id: {
        //   type: Sequelize.INTEGER,
        //   references: { model: account, key: 'account_id' },
        // },
    },
    {
        sequelize: db,
        modelName: 'customer',
    }
);

User.hasOne(Customer)
Customer.belongsTo(User)
module.exports = User;
