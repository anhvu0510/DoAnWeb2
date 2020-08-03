const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./db");
const Role = require("./user_role");
const Status = require("./user_status");
const Customer = require("./customer"); 



const Model = Sequelize.Model;
class User extends Model {
  static async findById(id) {
    return User.findByPk(id);
  }
  static async findByUsername(user_name) {
    return await User.findOne({
      where: { user_name }
    });
  }
  static async findByEmail(email) {
    return User.findOne({
      where: { email }
    });
  }
  
  // static async findAllUser() {
  //   // return User.findAll({
  //   //   include: [{
  //   //     model: Customer,
  //   //     attributes:['name']
  //   //   }],
     
  //   // })
  // }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  static confirmPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
  static updatePassword(id, newPassword) {
    const newHashedPassword = User.hashPassword(newPassword);
    return User.update(
      { password: newHashedPassword },
      {
        where: { id: id }
      }
    );
  }
}

User.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allownull: false
    },
    old_status: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
    modelName: "user"
  }
);
//Role.hasMany(User,, defaultValue: 0 })
User.belongsTo(Role, { constraints: false, foreignKey: "RoleID" });
//Status.hasMany(User, { constraints: false, defaultValue: 0 })
User.belongsTo(Status, { constraints: false, foreignKey: "StatusID" });


User.hasOne(Customer, {
  foreignKey: 'userId',
  targetKey: 'id',
})

Customer.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});
module.exports = User;
