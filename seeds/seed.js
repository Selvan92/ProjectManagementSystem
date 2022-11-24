const sequelize = require('../config/connection');
const { User, Employees, Customers, Jobs, TimeEntries  } = require('../models');

const userData = require('./userData.json');
const employeeData = require('./employeesData.json');
const customerData = require('./customersData.json');
const timeData  = require('./timeData.json');
const jobsData  = require('./jobsData.json');



const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userData,{
        individualHooks:true,
        returning:true,
    });

    await Customers.bulkCreate(customerData,{
        individualHooks:true,
        returning:true,
    })

    await Jobs.bulkCreate(jobsData,{
        individualHooks:true,
        returning:true,
    })

    // await TimeEntries.bulkCreate(timeData,{
    //     individualHooks:true,
    //     returning:true,
    // })

    await Employees.bulkCreate(employeeData,{
        individualHooks:true,
        returning:true,
    })

    process.exit(0);
};

seedDatabase();
