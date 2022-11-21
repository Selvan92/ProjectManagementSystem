const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create Employee model

class Employees extends Model {}

Employees.init(
    {
        employeeID: {
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        employee_contact_email:{
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        employee_department:{
            type: DataTypes.TEXT,
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
        userID: {
            type: DataTypes.INTEGER,
            foreignKey: true,
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
        modelName: "employee",
    },
);

module.exports = Employees;