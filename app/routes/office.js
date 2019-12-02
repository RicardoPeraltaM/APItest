const express = require('express')
const OfficeCtr = require('../controllers/Office.controller')

const Router = express.Router()

Router.get('/', OfficeCtr.index)
      .post('/', OfficeCtr.create)
      .get('/:key/:value', OfficeCtr.find, OfficeCtr.show)
      .put('/:key/:value', OfficeCtr.find, OfficeCtr.update)
      .delete('/:key/:value', OfficeCtr.find, OfficeCtr.remove)

module.exports = Router