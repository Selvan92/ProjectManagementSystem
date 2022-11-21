const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create time entries model

class TimeEntries extends Model {}

TimeEntries.init (
    {
        employee_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: "employees",
                key: "employee_ID",
            }
        },
        job_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: "jobs",
                key: "job_ID",
            }
        },
        Hours_worked:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Date_worked:{
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "timeEntries",
    },
);

module.exports = TimeEntries;