const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create Employee model

class Employees extends Model {}

Employees.init(
    {
        employee_ID: {
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
                  msg: 'Please enter your last name'
                }
            }
        },
        employee_contact_number: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                isInt: true,  
                len: [6,15],
            },
        },
        employee_contact_address: {
            type: DataTypes.VARCHAR(100),
            allowNull: false,
        },
        employee_contact_email:{
            type: DataTypes.VARCHAR(100),
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        employee_department:{
            type: DataTypes.VARCHAR(100),
            allowNull: false,
            validate:{
                isIn: [['plumbing', 'electrical','carpentary','admin']],
            },
        },
        hourly_pay:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        hourly_rate:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "User_ID",
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "employees",
    },
);

module.exports = Employees;