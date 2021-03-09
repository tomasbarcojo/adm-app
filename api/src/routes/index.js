const { Router } = require('express');
// import all routers;
const user = require('./user')
const supplier = require('./supplier')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', user);
router.use('/supplier', supplier)

module.exports = router;