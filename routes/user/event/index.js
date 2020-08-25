const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const Event = require('../../../models/event.model')
//Create an Event
router.post('/create', (req, res, next) => {
    Event
        .create(req.body)
        .then(response => console.log(response.data))
        .catch(err => next(err))
})
router.get('/:person_id', (req, res) => {
    Event
        .find( {owner: req.params.person_id})
        .then(response => res.json(response))
        .catch(err => next(err))
})
module.exports = router