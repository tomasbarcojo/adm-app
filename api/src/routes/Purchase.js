const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPurchases, createPurchase } = require('../controllers/Purchase')

server.get('/', /*authenticate,*/ getPurchases)

server.post('/createpurchase', /*authenticate,*/ createPurchase)

// server.post('/createpricelist', /*authenticate,*/ createPriceList)

// server.post('/editpricelist/:id', /*authenticate,*/ editPricelist)

// server.get('/:id', /*authenticate,*/ getPriceListsById) //test

// server.delete('/deletepricelist/:id', /*authenticate,*/ deletePriceList)

module.exports = server