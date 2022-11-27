const router = require('express').Router();
const {Customers,Employees,Jobs,TimeEntries,User} = require('../models');
const withAuth =require('../utils/auth');


  router.get('/',function(req,res){
  res.render('homepage')
})

    //find all users from user table
    //include associated information either employees or customers
    router.get('/users/:id', async (req,res)=>{
      try{
          const usersData = await User.findAll({});
          
          const users = usersData.map((user)=>user.get({plain:true}));
          
          res.render('userhomepage',{users});
      } catch (err){
          console.log(err);
          res.status(500).json(err);
      }
  });

  router.get('/:userID',async (req,res)=>{
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