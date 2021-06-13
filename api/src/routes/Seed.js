const server = require('express').Router()
const { Seed } = require('../controllers/Seed')

server.post('/', Seed)

module.exports = server