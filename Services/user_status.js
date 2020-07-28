const Sequelize = require("sequelize");
const db = require("./db");
const User = require('./user')
const Model = Sequelize.Model;
class Status extends Model {
    static async findByType(id_role) {
        return Role.findByPk(id_role);
    }
}

Status.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize: db,
        modelName: "user_status",
    }
);


module.exports = Status;
