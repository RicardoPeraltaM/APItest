const express = require('express')
const bodyParser = require('body-parser')

//App es una instancia de Express
const App = express()
const Patient = require('./routes/patient')
const Doctor = require('./routes/doctor')
const Office = require('./routes/office')
const Date = require('./routes/date')

//manejar peticiones y enviar respuestas en formato JSON
App.use(bodyParser.json())
//No recibir peticiones enviadas directamnete de un formulario 
App.use(bodyParser.urlencoded({extended: false}))

App.use('/patient', Patient)
App.use('/doctor', Doctor)
App.use('/office', Office)
App.use('/date', Office)


module.exports = App