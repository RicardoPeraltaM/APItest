const uniqueValidator = require('mongoose-unique-validator')

const mongoose = require('mongoose')

let Schema = mongoose.Schema

const DateSchema = new mongoose.Schema({
    fecha: {
    type: Date,
        required: true 
    },
    paciente:{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    consultorio:{
        type: Schema.Types.ObjectId,
        ref: 'Office'
    }
})

DateSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
const Dates = mongoose.model('Dates', DateSchema)
module.exports = Dates