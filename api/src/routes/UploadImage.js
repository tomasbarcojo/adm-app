const server = require('express').Router()
const authenticate = require('../utils/Auth')
const multer = require('multer')
var upload = multer({ dest: "../../public/images" })
const { uploadImage } = require('../controllers/UploadImage')

server.post('/', upload.single('files'), uploadImage);

module.exports = server