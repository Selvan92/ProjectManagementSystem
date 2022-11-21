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
            type: DataTypes.VARCHAR(100),
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Please enter your first name'
                }
            }
        },
        last_name: {
            type: DataTypes.VARCHAR(100),
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
            type: DataTypes.VARCHAR(100),
            allowNull: false,
        },
        customer_contact_email:{
            type: DataTypes.VARCHAR(100),
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "user_ID",
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "customers",
    },
);

module.exports = Customers;