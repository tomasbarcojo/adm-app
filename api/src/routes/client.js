const server = require('express').Router()
const authenticate = require('../utils/auth')
const { getClients, createClient } = require('../controllers/client')

server.get('/', authenticate, getClients)

server.post('/createSupplier', authenticate, createClient)

// server.get('/logout', userLogout)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)

// server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server