const User = require('./user');
const Employees = require('./employees');
const Customers = require('./customers');
const Jobs = require('./jobs');
const TimeEntries = require('./timeEntries');

//user has one employee
User.hasOne(Employees,{
        foreignKey: 'user_ID',
        onDelete: 'CASCADE',
        //on update default for onUpdate is cascade no need to change
    });

    //user has one customer
User.hasOne(Customers,{
        foreignKey: 'user_ID',
        onDelete: 'CASCADE',
        //on update default for onUpdate is cascade no need to change
    });

    // //employees has one user
// Employees.belongsTo(User,{
//         foreignKey: "user_ID"
//     });
// //customers has one user
// Customers.belongsTo(User,{
//         foreignKey: "user_ID"
//     });

//customers has many jobs
Customers.hasMany(Jobs, {
        foreignKey: "customer_ID",
        onDelete: 'CASCADE',
    });

// //employees has many jobs
// Employees.hasMany(Jobs, {
//         foreignKey: "employee_ID",
//         onDelete: 'CASCADE',
//     });

//employees has many timeEntries
Employees.hasMany(TimeEntries, {
        foreignKey: "employee_ID",
        onDelete: 'CASCADE',
});

// //jobs has many employees
// Jobs.belongsToMany(Employees,{
//         foreignKey: "employee_ID",
// });

//jobs has one customer
Jobs.belongsTo(Customers,{
    foreignKey: "customer_ID",
});
//jobs has many timeEntries
Jobs.hasMany(TimeEntries,{
    foreignKey: "Job_ID",
    onDelete: 'CASCADE',
});
//timeEntries has one employee
TimeEntries.belongsTo(Employees,{
    foreignKey: "employee_ID"
});
//timeEntries has one job
TimeEntries.belongsTo(Jobs,{
    foreignKey: "Job_ID"
});

module.exports = {User,Employees,Customers,Jobs,TimeEntries};
