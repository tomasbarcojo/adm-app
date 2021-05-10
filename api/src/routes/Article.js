const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getClients, createArticle, uploadImage } = require('../controllers/Article')

server.get('/', authenticate, getClients)

server.post('/createArticle', authenticate, createArticle)

server.post('/uploadimage', uploadImage)