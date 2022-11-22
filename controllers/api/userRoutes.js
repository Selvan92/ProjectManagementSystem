const router = require('express').Router();
const { User, Customers,Employees,TimeEntries,Jobs } = require('../../models');

router.get('/', async (req,res)=>{
    //find all users from user table
    //include associated information either employees or customers
    try{
        await User.findAll({
            include:[
            {
                model:Customers,
            },
            {
                model: Employees,
            }
            ]
        }).then (data => res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/:userID',(req,res)=>{
    //find a single user by their userID
    //include associated data from customers or Employees
    try{
        User.findOne({
            where:{
                userID:req.params.userID,
            },
            include:[
                {
                    model: Customers,
                },
                {
                    model: Employees,
                }
            ]
        }).then(data=> res.status(200).json(data))
    } catch (err){
        res.status(500).json(err);
    }
});

router.delete('/:userID', (req,res)=>{
    //delete user by userID
    try {
        User.destroy({
            where: {
                userID:req.params.userID
            }
        }).then(data=> res.status(200).json(data));
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async (req,res)=>{
    try{
        const userData = await User.findOne({where: {username:req.body.username}});

        if(!userData) {
            res
                .status(400)
                .json({message: 'Incorrect username or password, please try again'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect username or password, please try again'});
            return;
        }
        
        req.session.save(()=>{
            req.session.userID = userData.userID;
            req.session.validPassword = true;
            res.json({user: userData, message:'You are now logged in'});
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;