const User = require('./user');
const Employees = require('./employees');
const Customers = require('./customers');
const Jobs = require('./jobs');
const TimeEntries = require('./timeEntries');
const { update } = require('./user');

//user has one employee
User.hasOne(Employees,{
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        //on update default for onUpdate is cascade no need to change
    });

    //user has one customer
User.hasOne(Customers,{
        foreignKey: 'userID',
        onDelete: 'CASCADE',
        //on update default for onUpdate is cascade no need to change
    });

//customers has many jobs
Customers.hasMany(Jobs, {
        foreignKey: "customerID",
        onDelete: 'CASCADE',
    });

//employees has many timeEntries
Employees.hasMany(TimeEntries, {
        foreignKey: "employeeID",
        onDelete: 'CASCADE',
});

//jobs has one customer
Jobs.belongsTo(Customers,{
    foreignKey: "customerID",
});

//jobs has many timeEntries
Jobs.hasMany(TimeEntries,{
    foreignKey: "jobID",
    onDelete: 'CASCADE',
});

//timeEntries has one employee
TimeEntries.belongsTo(Employees,{
    foreignKey: "employeeID"
    });

//timeEntries has one job
TimeEntries.belongsTo(Jobs,{
    foreignKey: "jobID"
});

Customers.belongsTo(User,{
    foreignKey:'userID'
});

Employees.belongsTo(User,{
    foreignKey:'userID'
});

module.exports = {User,Employees,Customers,Jobs,TimeEntries};
