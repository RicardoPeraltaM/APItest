const express = require('express')
const PatientCtr = require('../controllers/PatientController')

const Router = express.Router()

Router.get('/', PatientCtr.index) //función index(Listar productos)
      .post('/', PatientCtr.create) //función create(crear productos)
      .get('/:key/:value',PatientCtr.find, PatientCtr.show)//función show(buscar un paciente por medio de un key y un valor)
      .put('/:key/:value',PatientCtr.find, PatientCtr.update)//función show(actualizar un paciente por medio de un key y un valor)
      .delete('/:key/:value',PatientCtr.find, PatientCtr.remove)//función show(eliminar un paciente por medio de un key y un valor)

module.exports = Router