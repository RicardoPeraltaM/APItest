const Office = require('./../models/Office')

function index(req, res){
    Office.find({}).then( offices =>{
        if(offices.length) return res.status(200).send({offices})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(error => res.status(500).send({error}))
}

function create(req, res){
    new Office(req.body).save().then( office => res.status(201).send({office})).catch(error => res.status(500).send({error}))
}

function find(req, res, next){
    let query = {}
    query[req.params.key] = req.params.value
    Office.find(query).then(offices =>{
        if(!offices.length) return next()
        req.body.offices = offices
        return next()
    }).catch(error => {
        req.body.error = error
        next()
    })
}

function show(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.offices) return res.status(404).send({message: 'Not found'})
    let offices = req.body.offices

    return res.status(200).send({offices})
}

function update(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.offices)return res.status(404).send({message: 'Not found'})
    let office = req.body.offices[0]
    office = Object.assign(office, req.body)
    office.save().then(office => res.status(200).send({ message:'UPDATED', office})).catch(error => res.status(500).send({error}))
}

function remove(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.offices)return res.status(404).send({message: 'Not found'})
    req.body.offices[0].remove().then(office => res.status(200).send({message:'REMOVED', office})).catch(error => res.status(500).send({error}))
}

module.exports = {
    index,
    create,
    find,
    show,
    update,
    remove
}