const router = require('express').Router();
const { User, Customers,Employees,TimeEntries,Jobs } = require('../../models');
    
//find all employees for employees table
//include all associated information from jobs and time entries
    router.get('/', async (req,res)=>{
        try{
            await Employees.findAll({
                // include:[
                //     {
                //         model: Jobs,
                //     },
                //     {
                //         model: TimeEntries,
                //     }
                // ]
            }).then ((data)=> res.status(200).json(data))
        } catch (err){
            res.status(500).json(err);
        }
    });
    
        //find a single user by their employeeID
        //include all associated information from jobs and time entries
    router.get('/:employeeID', async (req,res)=>{
    
        try{
             await Employees.findByPk(req.params.employeeID, { 
                // include:[
                //     {
                //         model: Jobs,
                //     },
                //     {
                //         model:TimeEntries
                //     }
                // ]
            }).then(data=> res.status(200).json(data))
        } catch (err){
            res.status(500).json(err);
        }
    });
    
    //delete a employeeID
    router.delete('/:employeeID', (req,res)=>{
        try{
            Customers.destroy({
                where:{
                    employeeID:req.params.employeeID
                }
            }).then(data=>res.status(200).json(data));
        } catch (err) {
            res.status(500).json(err);
        }
    });
    
    //creat new employee
    router.post('/', (req,res)=>{
    //     /* req.body should look like this...
    //     {
    //       first_name: Frodo,
    //       last_name: Baggins,
    //       employee_contact_number: 9,
    //       employee_contact_address: Mount Doom
    //       employee_contact_email: frodo@middleearth.com
    //       employee_department: plumbing
    //       hourly_pay: 7
    //       hourly_rate: 10 
    //       userID: -this will come from the associated user-
    //       employeeID: -this will be auto iterating doesnt need to be entered -
    //     }
    //   */
        try{
            const newEmployee = req.body
            if(newEmployee){
                Employees.create(newEmployee)
                .then(data=> res.status(200).json(data));
            }
        }catch(err){
            res.status(400).json(err);
        }
    });
    
    //update customer by their employeeID
    router.put('/:employeeID', (req,res)=>{
        try{
            Employees.update({
                first_name: req.body.first_name,
                last_name:req.body.last_name,
                employee_contact_number:req.body.employee_contact_number,
                employee_contact_address:req.body.employee_contact_address,
                employee_contact_email:req.body.employee_contact_email,
                employee_department: req.body.employee_department,
                hourly_pay: req.body.hourly_pay,
                hourly_rate: req.body.hourly_rate,
                userID:req.body.userID,
            },
            {
                where:{
                    employeeID:req.params.employeeID
                }
            }).then ((data)=> {
                res.status(200).json(data);
            })
        }catch(err){
            res.status(500).json(err);
        }
    });
    
    
    module.exports = router;
    