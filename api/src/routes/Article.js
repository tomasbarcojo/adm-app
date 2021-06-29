const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getArticles, getArticlesBySupplierId, createArticle } = require('../controllers/Article')

server.get('/', authenticate, getArticles)

server.get('/supplier/:id', /*authenticate,*/ getArticlesBySupplierId)

server.post('/createArticle', authenticate, createArticle)

module.exports = server