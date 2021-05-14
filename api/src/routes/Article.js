const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getArticles, createArticle } = require('../controllers/Article')

server.get('/', authenticate, getArticles)

server.post('/createArticle', authenticate, createArticle)

module.exports = server