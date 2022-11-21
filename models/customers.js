const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create Customer model

class Customers extends Model {}

Customers.init(
    {
        customer_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Please enter your first name'
                }
            }
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Please enter your first name'
                }
            }
        },
        customer_contact_number: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                isInt: true,  
                len: [6,15],
            },
        },
        customer_contact_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        customer_contact_email:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "userID",
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "customer",
    },
);

module.exports = Customers;