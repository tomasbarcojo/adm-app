const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPriceLists, createPriceList, getPriceListsWithData, getPriceListsById, editPricelist, deletePriceList } = require('../controllers/Pricelist')

server.get('/', /*authenticate,*/ getPriceLists)

server.get('/alldata', /*authenticate,*/ getPriceListsWithData)

server.post('/createpricelist', /*authenticate,*/ createPriceList)

server.post('/editpricelist/:id', /*authenticate,*/ editPricelist)

server.get('/:id', /*authenticate,*/ getPriceListsById) //test

server.delete('/deletepricelist/:id', /*authenticate,*/ deletePriceList)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)


module.exports = server