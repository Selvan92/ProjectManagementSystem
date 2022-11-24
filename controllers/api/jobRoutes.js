const router = require('express').Router();
const { Jobs,Customers,Employees,TimeEntries,User } = require('../../models');
const withAuth = require('../../utils/auth');

//find all job entries for job entries table
//include all associated information 
router.get('/', async (req,res)=>{
    try{
        await Jobs.findAll({})
        .then((data)=> res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

//find a time entry by customerID 
//include all associated information 
router.get('/:customerID', async (req,res)=>{
    try{
        await Jobs.findAll({
            where:{
                customerID: req.params.customerID
            },
            attributes:['jobID','job_description','customerID'],
        })
        .then((data)=> res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

    //create new job entry
    router.post('/', (req,res)=>{
        //     /* req.body should look like this...
        //     {
        //          "customerID":1,
        //          "job_description": "This is a test job",
        //     }
        //   */
            try{
                const newJob = req.body
                if(newJob){
                    Jobs.create(newJob)
                    .then((data)=> res.status(200).json(data));
                }
            }catch(err){
                res.status(400).json(err);
            }
        });


module.exports = router;

