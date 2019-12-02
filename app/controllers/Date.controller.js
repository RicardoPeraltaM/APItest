const Date = require('../models/Dates')

function index(req, res){
    Date.find({}).then( dates =>{
        if (dates.length)return res.status(200).send({dates})
        return res.status(204).send({message: 'NO CONTENT'})
    }).catch(error => res.status(500).send({error}))
}

function create(req, res){
    new Date (req.body).save().then( date => res.status(200).send({date})).catch( error =>res.status(500).send({error}))
}

function find(req, res, next){
    let query={}
    query[req.params.key] = req.params.value

    Date.find(query).then(dates => {
        if(!dates.length) return next()
        req.body.dates = dates
        return next()
    }).catch(error => {
        req.body.error = error
        next()
    })
}

function show(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.dates) return res.status(404).send({message: 'Not found'})
    let dates = req.body.dates
    return res.status(200).send({dates})
}

function update(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.dates) return res.status(404).send({message: 'Not found'})
    let date = req.body.dates[0]
    date = Object.assign(date, req.body)
    date.save().then(date=> res.status(200).send({message:'UPDATED', date})).catch(error => res.status(500).send({error}))
}

function remove(req, res){
    if(req.body.error) return res.status(500).send({error})
    if(!req.body.dates) return res.status(404).send({message:"Not found"})
    req.body.dates[0].remove().then(date => res.status(200).send({message: "Removed", date})).catch(error => res.status(500).send({error}))
}


module.exports = {
    index,
    create,
    find,
    show,
    update,
    remove
}

