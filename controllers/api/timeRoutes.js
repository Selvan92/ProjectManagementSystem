const router = require('express').Router();
const { User, Customers,Employees,TimeEntries,Jobs } = require('../../models');

//find all timeentries for timeentries table
//include all associated information 
router.get('/', async (req,res)=>{
    try{
        await TimeEntries.findAll({})
        .then((data)=> res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

        //find a time entry by jobID 
        //include all associated information 
        router.get('/jobs/:jobID', async (req,res)=>{
    
            try{
                 await TimeEntries.findOne(req.params.jobID, { 
                 }).then(data=> res.status(200).json(data))
            } catch (err){
                res.status(500).json(err);
            }
        });

        //find a time entry by customerID 
        //include all associated information 
        router.get('/employee/:employeeID', async (req,res)=>{
    
            try{
                 await TimeEntries.findOne(req.params.employeeID, { 
                 }).then(data=> res.status(200).json(data))
            } catch (err){
                res.status(500).json(err);
            }
        });

    //creat new time entry
    router.post('/', (req,res)=>{
        //     /* req.body should look like this...
        //     {
                // "employeeID":1,
                // "jobID": 1,
                // "Hours_worked": 5,
                // "Date_worked":20221122
        //     }
        //   */
            try{
                const newTime = req.body
                if(newTime){
                    TimeEntries.create(newTime)
                    .then(data=> res.status(200).json(data));
                }
            }catch(err){
                res.status(400).json(err);
            }
        });

module.exports = router;