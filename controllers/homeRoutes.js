const router = require('express').Router();
const {Customers,Employees,Jobs,TimeEntries,User} = require('../models');
const withAuth =require('../utils/auth');


  router.get('/',function(req,res){
  res.render('homepage')
})

    //find all jobs rend listing of Jobs
    //include associated information either employees or customers
    router.get('/jobs', async (req,res)=>{
      try{
          const jobsData = await Jobs.findAll({
            include:[
              {
                  model: Customers,
              },
              {
                  model: TimeEntries,
              },
          ]
          });
          const job = jobsData.map((jobs)=>jobs.get({plain:true}));
          console.log(job);
          res.render('jobListing',{job});
      } catch (err){
          console.log(err);
          res.status(500).json(err);
      }
  });

    //find all timeentries render listing of time entries
    //include associated information either employees or customers
    router.get('/timeRecords', async (req,res)=>{
      try{
          const timeData = await TimeEntries.findAll({
            include:[
              {
                  model: Employees,
              },
              {
                  model: Jobs,
              },
          ]
          });
          const time = timeData.map((timeRecords)=>timeRecords.get({plain:true}));
          console.log(time);
          res.render('timeListing',{time});
      } catch (err){
          console.log(err);
          res.status(500).json(err);
      }
  });

  router.get('/users/:userID',async (req,res)=>{
    //find a single user by their userID
    //include associated data from customers or Employees
    try{
        await User.findByPk(req.params.userID, {
            include:[
                {
                    model: Customers,
                },
                {
                    model: Employees,
                },
            ]
        })
        .then((dbUserData)=> {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
          }
          const user = dbUserData.get({plain:true});
          console.log(user);
          res.render('userhomepage',{user});
    })} catch (err){
      res.status(500).json(err);
  }
  });


// Use withAuth middleware to prevent access to route
router.get('/user', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.userID, {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;