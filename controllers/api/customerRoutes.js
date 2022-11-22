const router = require('express').Router();
const { User, Customers,Employees,TimeEntries,Jobs } = require('../../models');


    //find all customers for customers table
    //include all associated information from jobs and time entries
router.get('/', async (req,res)=>{
    try{
        await Customers.findAll({
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

    //find a single user by their customerID
    //include all associated information from jobs and time entries
router.get('/:customerID', async (req,res)=>{

    try{
         await Customers.findByPk(req.params.customerID, { 
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

//delete a customer
router.delete('/:customerID', (req,res)=>{
    //delete customerID
    try{
        Customers.destroy({
            where:{
                customerID:req.params.customerID
            }
        }).then(data=>res.status(200).json(data));
    } catch (err) {
        res.status(500).json(err);
    }
});

//creat new customer
router.post('/', (req,res)=>{
//     /* req.body should look like this...
//     {
//       first_name: Peter,
//       last_name: Jackson,
//       customer_contact_number: 5,
//       customer_contact_address: hobbiton
//       customer_contact_email: peter@middleearth.com
//       userID: -this will come from the associated user-
//       customerID: -this will be auto iterating doesnt need to be entered -
//     }
//   */
    try{
        const newCustomer = req.body
        if(newCustomer){
            Customers.create(newCustomer)
            .then(data=> res.status(200).json(data));
        }
    }catch(err){
        res.status(400).json(err);
    }
});

//update customer by their customerID
router.put('/:customerID', (req,res)=>{
    try{
        Customers.update({
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            customer_contact_number:req.body.customer_contact_number,
            customer_contact_address:req.body.customer_contact_address,
            customer_contact_email:req.body.customer_contact_email,
            userID:req.body.userID,
        },
        {
            where:{
                customerID:req.params.customerID
            }
        }).then ((data)=> {
            res.status(200).json(data);
        })
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;
