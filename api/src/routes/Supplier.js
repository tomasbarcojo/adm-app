const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { createSupplier, getSuppliers } = require('../controllers/Supplier')

server.get('/', authenticate, getSuppliers)

server.post('/createSupplier', authenticate, createSupplier)

// server.get('/logout', userLogout)

// server.post('/login', loginUser)

// server.get('/:id', authenticate, getOneUser)

// server.put('/editUser/:id', /*authenticate,*/ modifyUser)

// server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server