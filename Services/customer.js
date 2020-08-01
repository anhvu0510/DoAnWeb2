const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./user");

const Model = Sequelize.Model;
class Customer extends Model {
    static async findAllCustomer() {
        return Customer.findAll({
            include: [
                {
                    model: User,
                    where: {
                        RoleID: 0
                    },
                    attributes: ['StatusID']
                }]
        })
    }


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
    
  static async findById(user_id) {
    return Customer.findByPk(user_id);
  }
  static async findByPhoneNumber(phone_number) {
    return await Customer.findOne({
      where: { phone: phone_number }
    });
  }
  static async findByIdentifyID(identify_id) {
    return await Customer.findOne({
      where: { identifyID: identify_id }
    });
  }
  static async findByUserId(user_id) {
    return await Customer.findOne({
      where: { userId: user_id }
    });
  }
  static async updateDate(date) {
    return await Customer.update(
      {
        identifyDate: date
      },
      {
        where: { id: "1" }
      }
    );
  }
  static async updateInformation(id, name, dob, gender, phone, address) {
    return await Customer.update(
      {
        name: name,
        dob: dob,
        gender: gender,
        phone: phone,
        address: address
      },
      { where: { id: id } }
    );
  }
}

Customer.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dob: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    gender: {
      allowNull: false,
      type: Sequelize.STRING
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING
    },
    identify: {
      allowNull: false,
      type: Sequelize.STRING
    },
    identifyID: {
      allowNull: false,
      type: Sequelize.STRING
    },
    identifyDate: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    identifyFontImg: {
      allowNull: false,
      type: Sequelize.STRING
    },
    identifyEndImg: {
      allowNull: false,
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    modelName: "customer"
  }
);

User.hasOne(Customer);
Customer.belongsTo(User);
module.exports = Customer;
