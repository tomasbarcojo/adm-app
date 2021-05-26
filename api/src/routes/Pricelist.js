const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getPriceLists, createPriceList, createPriceList2, test } = require('../controllers/Pricelist')

server.get('/', authenticate, getPriceLists)

server.post('/createpricelist', authenticate, createPriceList)

server.post('/createpricelist2', /*authenticate,*/ createPriceList2) //test

server.post('/createpricelist3', /*authenticate,*/ test) //test

// server.get('/logout', userLogout)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)

// server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server