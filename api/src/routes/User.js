const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getUsers, createUser, modifyUser, deleteUser, loginUser, getOneUser } = require('../controllers/user')

server.get('/', /*authenticate,*/ getUsers)

server.post('/createUser', /*authenticate,*/ createUser)

server.post('/login', loginUser)

server.get('/:id', authenticate, getOneUser)

server.put('/editUser/:id', /*authenticate,*/ modifyUser)

server.delete('/deleteUser/:id', /*authenticate,*/ deleteUser)

module.exports = server