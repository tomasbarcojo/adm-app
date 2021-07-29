const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPurchases, createPurchase, getPurchasesById, getPurchaseDetailById } = require('../controllers/Purchase')

server.get('/', /*authenticate,*/ getPurchases)

server.post('/createpurchase', /*authenticate,*/ createPurchase)

server.get('/:id', /*authenticate,*/ getPurchasesById)

server.get('/detail/:id', /*authenticate,*/ getPurchaseDetailById)

// server.post('/editpricelist/:id', /*authenticate,*/ editPricelist)

// server.get('/:id', /*authenticate,*/ getPriceListsById) //test

// server.delete('/deletepricelist/:id', /*authenticate,*/ deletePriceList)

module.exports = server