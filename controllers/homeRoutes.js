const router = require('express').Router();
const {Customers,Employees,Jobs,TimeEntries,User} = require('../models');
const withAuth =require('../utils/auth');

router.get('/', async (req,res)=> {
    try{
        //Get all tables and join with user data
        const userData = await User.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username','userID'],
                },
            ],
        });
        //Serialise data so the template can read it
        const users = userData.map((user)=> user.get({plain:true}));

        //pass serialised data and session flag into template
        res.render('homepage',{
            users,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
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