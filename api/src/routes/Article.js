const server = require('express').Router()
const authenticate = require('../utils/Auth')
const multer = require('multer')
var upload = multer({ dest: "../../public/images" })
const { getClients, createArticle, uploadImage } = require('../controllers/Article')

// server.get('/', authenticate, getClients)

// server.post('/createArticle', authenticate, createArticle)

server.post('/uploadproductimage', upload.single('files'), uploadImage);

module.exports = server