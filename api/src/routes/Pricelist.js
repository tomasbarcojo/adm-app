const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPriceLists, createPriceList, createPriceList2, getPriceListsById } = require('../controllers/Pricelist')

server.get('/', /*authenticate,*/ getPriceLists)

server.post('/createpricelist', /*authenticate,*/ createPriceList)

// server.post('/createpricelist2', /*authenticate,*/ createPriceList2) //test

server.get('/:id', /*authenticate,*/ getPriceListsById) //test

// server.get('/logout', userLogout)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)

// server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server