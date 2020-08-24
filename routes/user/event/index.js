const express = require('express')
const router = express.Router()

const Event = require('../../../models/event.model')
router.post('/create', (req, res, next) => {
    Event
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})
module.exports = router