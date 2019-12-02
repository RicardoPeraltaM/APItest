const Patient = require('./../models/Patient')

//Listar Todos Los elementos (Pacientes)
function index(req, res){
    Patient.find({}).then(patients => { //patients = array[]
        if(patients.length)return res.status(200).send({patients})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(error => res.status(500).send({error}))
}

//crear pacientes nuevos
function create(req, res){
    new Patient(req.body).save().then(patient => res.status(201).send({patient})).catch(error => res.status(500).send({error}))
}

//Para buscar, actualizar o elimianr un Registro es necesario primero saber con que registro vamos a trabajar
//por tal motivo es necesario tener una función que nos ayude a obtener esa información
//usamos MiddleWare  
function find(req, res, next){
    let query = {}
    query[req.params.key] = req.params.value

    Patient.find(query).then( patients => {
        if(!patients.length) return next()
        req.body.patients = patients
        return next()
    }).catch(error => {
        req.body.error = error
        next()
    })
}

//traer pacientes (uno por uno) bajo un parametro de búsqueda
function show(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.patients) return res.status(404).send({message: 'Not found'})
    let patients = req.body.patients
    
    return res.status(200).send({patients})
}

//actualiza pacientes
function update(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.patients) return res.status(404).send({message: 'Not found'})
    let patient = req.body.patients[0]
    patient = Object.assign(patient, req.body)
    patient.save().then(patient => res.status(200).send({message: "Updated", patient})).catch(error => res.status(500).send({error}))
}

//Elimiar pacientes
function remove(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.patients) return res.status(404).send({message:"Not found"})
    req.body.patients[0].remove().then(patient => res.status(200).send({message: "Removed", patient})).catch(error => res.status(500).send({error}))
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}

//req = manejar la petición === res = responder al usuario