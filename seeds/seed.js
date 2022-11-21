const sequelize = require('../config/connection');
const { User, Employees, Customers  } = require('../models');

const userData = require('./userData.json');
const employeeData = require('./employeesData.json');
const customerData = require('./customersData.json');



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

    await Employees.bulkCreate(employeeData,{
        individualHooks:true,
        returning:true,
    })

    process.exit(0);
};

seedDatabase();
