const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class AccountType extends Model {
  static async findByType(type) {
    return AccountType.findByPk(type);
  }
}

AccountType.init(
  {
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    modelName: "accounttype"
  }
);

module.exports = AccountType;
