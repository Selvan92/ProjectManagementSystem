const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const customerRoutes = require('./customerRoutes');
const employeeRoutes = require('./employeeRoutes');
const timeRoutes =require('./timeRoutes');

router.use('/users', userRoutes);
router.use('/jobs',jobRoutes);
router.use('/customers',customerRoutes);
router.use('/employees', employeeRoutes);
router.use('/time',timeRoutes);

module.exports = router;
