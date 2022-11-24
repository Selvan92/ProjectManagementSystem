const router = require('express').Router();
const { Jobs,Customers,Employees,TimeEntries,User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res)=>{
    try{
        const newJob = await Jobs.create({
            ...req.body,
            userId: req.session.userId,
        })

        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth,async(req,res)=> {
    try {
        const jobData = await Jobs.destroy({
            where:{
                jobID: req.params.jobID,
                customerID: req.session.customerID
            },
        });

        if(!jobData){
            res.status(404).json({message: 'No job found with this id'});
            return;
        }

        res.status(200).json(jobData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//find all job entries for job entries table
//include all associated information 
router.get('/', async(req,res)=>{
    try {
        await Jobs.findAll({})
        .then((data)=res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

        //find a time entry by customerID 
        //include all associated information 
        router.get('/:customerID', async (req,res)=>{
    
            try{
                 await Jobs.findOne(req.params.customerID, { 
                 }).then(data=> res.status(200).json(data))
            } catch (err){
                res.status(500).json(err);
            }
        });

    //creat new time entry
    router.post('/', (req,res)=>{
        //     /* req.body should look like this...
        //     {
        //          "customerID":1,
        //          "job_description": 1,
        //     }
        //   */
            try{
                const newJob = req.body
                if(newJob){
                    Jobs.create(newJob)
                    .then(data=> res.status(200).json(data));
                }
            }catch(err){
                res.status(400).json(err);
            }
        });


module.exports = router;

