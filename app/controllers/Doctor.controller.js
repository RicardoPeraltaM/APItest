const Doctor = require('./../models/Doctor')

function index(req, res){
    Doctor.find({}).then(doctors => { //doctors = array[]
        if(doctors.length)return res.status(200).send({doctors})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(error => res.status(500).send({error}))
}


function create(req, res){
    new Doctor(req.body).save().then(doctor => res.status(201).send({doctor})).catch(error => res.status(500).send({error}))
}


function find(req, res, next){
    let query ={}
    query[req.params.key] = req.params.value

    Doctor.find(query).then(doctors => {
        if(!doctors.length) return next()
        req.body.doctors = doctors
        return next()
    }).catch(error =>{
        req.body.error = error
        next()
    })
}

function show(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.doctors) return res.status(404).send({message:'Not found'})

    let doctors = req.body.doctors
    res.status(200).send({doctors})
}

function update(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.doctors) return res.status(404).send({message:'Not found'})
    let doctor = req.body.doctors[0]
    doctor = Object.assign(doctor, req.body)
    doctor.save().then(doctor => res.status(200).send({message : 'Updated', doctor})).catch(error => res.status(500).send({error}))

}

function remove(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.doctors) return res.status(404).send({message: 'Not found'})
    req.body.doctors[0].remove().then(doctor => res.status(200).send({message: "Removed", doctor})).catch(error => res.status(500).send({error}))
}

module.exports = {
    index,
    create,
    find,
    show,
    update,
    remove
}