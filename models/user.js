const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
    async checkPassword(loginPw){
        return await bcrypt.compare(loginPw, this.checkPassword);
    }
}

User.init(
    {
        userID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [6],
            },
        },
        account_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isIn: [['customer', 'employee']],
            },
            },
    },
    {
        hooks: {
            async beforeCreate(user) {
                user.password = await bcrypt.hash(user.password,10);
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;