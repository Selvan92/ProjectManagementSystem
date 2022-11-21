const router = require('express').Router();
const { Jobs } = require('../../models');
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
                job_ID: req.params.job_ID,
                customer_ID: req.session.customer_ID
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

module.exports = router;

