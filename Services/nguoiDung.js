const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class NguoiDung extends Model {
    static async findById(ma_nguoi_dung) {
        return NguoiDung.findByPk(ma_nguoi_dung);
    }
    static async findByUsername(ten_nguoi_dung) {
        return await NguoiDung.findOne({
            where: { ten_nguoi_dung }
        });
    }
    static async findByEmail(email) {
        
        return NguoiDung.findOne({
            where : {email}
        })
    }
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    static confirmPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

NguoiDung.init(
    {
        ma_nguoi_dung: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        ten_nguoi_dung: {
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        mat_khau: {
            type: Sequelize.STRING,
            allownull: false
        },
        trang_thai: {
            type: Sequelize.INTEGER
        },
        quyen_nguoi_dung: {
            type: Sequelize.INTEGER
        }
    },
    {
        sequelize: db,
        modelName: "nguoidung"
    }
);

module.exports = NguoiDung;
