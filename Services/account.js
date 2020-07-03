const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class Account extends Model {
  static async findById(id) {
    return Account.findByPk(id);
  }
  static async findByUsername(username) {
    return Account.findOne({
      where: { username }
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
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      allownull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    sequelize: db,
    modelName: "account"
  }
);

module.exports = Account;
