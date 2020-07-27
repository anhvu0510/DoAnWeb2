const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('./db');
const accounttype = require('./accounttype');

const Model = Sequelize.Model;
class Account extends Model {
  static async findById(account_id) {
    return Account.findByPk(account_id);
  }
  static async findByUsername(user_name) {
    return await Account.findOne({
      where: { user_name },
    });
  }
  static async findByEmail(email) {
    return Account.findOne({
      where: { email },
    });
  }
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  static confirmPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

Account.init(
  {
    account_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allownull: false,
    },
    account_type: {
      type: Sequelize.INTEGER,
      references: { model: accounttype, key: 'type' },
    },
    status: {
      type: Sequelize.INTEGER,
      allownull: false,
    },
    permission: {
      type: Sequelize.INTEGER,
      allownull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'account',
  }
);

module.exports = Account;
