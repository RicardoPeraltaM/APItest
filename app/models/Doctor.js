const mongoose = require('mongoose')

let Especialidades ={
    values: [
        'Dermatología',
        'Cardiología',
        'Nutriología',
        'Pediatría',
        'Estomatología',
        'Ematología',
    ],
    message: '{VALUE} no contamos con esa especialidad'
}

const DoctorSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    sexo:{
        type: String,
        required: true,
        enum: [
            'Masculino',
            'Femenino'
        ]
    },
    especialidad:{
        type: String,
        required: true,
        enum:Especialidades
    },
})

const Doctor = mongoose.model('Doctor', DoctorSchema)
module.exports = Doctor