const {Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//create time entries model

class TimeEntries extends Model {}

TimeEntries.init (
    {
        employeeID: {
            type: DataTypes.INTEGER,
            references: {
                model: "employees",
                key: "employeeID",
            }
        },
        jobID: {
            type: DataTypes.INTEGER,
            references: {
                model: "jobs",
                key: "jobID",
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
        modelName: "timeEntries",
    },
);

module.exports = TimeEntries;