const express = require('express')
const DoctorCtr = require('../controllers/Doctor.controller')

const Router = express.Router()

Router.get('/', DoctorCtr.index)
      .post('/', DoctorCtr.create)
      .get('/:key/:value', DoctorCtr.find, DoctorCtr.show)
      .put('/:key/:value', DoctorCtr.find, DoctorCtr.update)
      .delete('/:key/:value', DoctorCtr.find, DoctorCtr.remove)

module.exports = Router