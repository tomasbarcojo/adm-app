const { Router } = require('express');
// import all routers;
const user = require('./User')
const supplier = require('./Supplier')
const pricelist = require('./Pricelist')
const client = require('./Client')
const upload = require('./Article')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', user);
router.use('/supplier', supplier)
router.use('/pricelist', pricelist)
router.use('/client', client)
router.use('/upload', upload)

module.exports = router;