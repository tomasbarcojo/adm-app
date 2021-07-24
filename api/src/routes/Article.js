const server = require('express').Router()
const authenticate = require('../utils/Auth')
const { getArticles, getArticlesBySupplierId, getArticlesByCategoryId, createArticle } = require('../controllers/Article')

server.get('/', authenticate, getArticles)

server.get('/supplier/:id', /*authenticate,*/ getArticlesBySupplierId)

server.get('/category/:id', /*authenticate,*/ getArticlesByCategoryId)

server.post('/createArticle', authenticate, createArticle)

module.exports = server