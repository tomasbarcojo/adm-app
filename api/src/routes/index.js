const { Router } = require('express');
// import all routers;
const classesUser = require('./user')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', classesUser);

module.exports = router;