const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class User extends Model {
  static async findById(user_id) {
    return User.findByPk(user_id);
  }
  static async findByPhoneNumber(phone_number) {
    return User.findOne({
      where: { phone_number }
    });
  }
  static async findByEmail(email) {
    return User.findOne({
      where: { email }
    });
  }
  static async findByIdCard(id_card) {
    return User.findOne({
      where: { id_card }
    });
  }
}

User.init(
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    DOB: {
      type: Sequelize.DATEONLY
    },
    gender: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    id_card: {
      type: sequelize.integer
    },
    issue_date_for_id_card: {
      type: Sequelize.DATEONLY
    },
    id_card_front_side_photo: {
      type: Sequelize.STRING.BINARY
    },
    id_card_back_side_photo: {
      type: Sequelize.STRING.BINARY
    },
    user_id: {
      type: Sequelize.int,
      references: { model: account, key: "account_id" }
    }
  },
  {
    sequelize: db,
    modelName: "user"
  }
);

module.exports = User;
