const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create jobs model

class Jobs extends Model {}

Jobs.init(
    {
        job_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        job_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                  msg: 'Please enter a job description'
                }
            }
        },
        customer_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: "customers",
                key: "customer_ID",
            }
        },
        // employee_ID: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: "employees",
        //         key: "employee_ID",
        //     }
        // },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "jobs",
    },
);

module.exports = Jobs;