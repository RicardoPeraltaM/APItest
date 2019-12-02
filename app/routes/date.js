const express = require('express')
const DatesCtr = require('../controllers/Date.controller')

const Router = express.Router()

Router.get('/', DatesCtr.index)
      .post('/',DatesCtr.create)
      .get('/:key/:value', DatesCtr.find, DatesCtr.show)
      .put('/:key/:value', DatesCtr.find, DatesCtr.update)
      .put('/:key/:value', DatesCtr.find, DatesCtr.remove)


module.exports = Router