const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getCategories, createCategory } = require('../controllers/Category')

server.get('/', authenticate, getCategories)

server.post('/createCategory', /*authenticate,*/ createCategory)

module.exports = server