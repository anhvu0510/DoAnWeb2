const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class Status extends Model {
  static async findById(status_id) {
    return Status.findByPk(status_id);
  }
}

Status.init(
  {
    status_id: {
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
    modelName: "status"
  }
);

module.exports = Status;
