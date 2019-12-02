const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

const officeSchema = new mongoose.Schema({
    consultorioNumero:{
        type: Number,
        required: true
    },
    encargado:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }

})

officeSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'})
const Office = mongoose.model('Office', officeSchema)
module.exports = Office