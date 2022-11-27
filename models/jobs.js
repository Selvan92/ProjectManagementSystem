const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create jobs model

class Jobs extends Model {}

Jobs.init(
    {
        jobID: {
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
        customerID: {
            type: DataTypes.INTEGER,
            references: {
                model: "customers",
                key: "customerID",
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
       
        modelName: "jobs",
    },
);

module.exports = Jobs;