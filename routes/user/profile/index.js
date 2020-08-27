const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const passport = require("passport")
//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()


//Helper functions 
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : null;
const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null;
const handleErrors = (err, req, res, next) => res.status(500).json({ message: "Oops, something went wrong... try it later :" })

const obtainDetailsUpdate = body => {
    const elementToChange = {...body}
    delete elementToChange.username
    delete elementToChange.email
    delete elementToChange.password
    return elementToChange
}
const isUserFormValid = (model, body, res) => {
    if (model == Person && !validationHandler.areRequiredFieldsFilled(body, res)) {
        return false
    }
    return true
}
const updateDetails = (id, body, next) => {
    user.findByIdAndUpdate(id, obtainDetailsUpdate(body), { new: true })
        .then(response => response)
        .catch(err => next(err))
}
//edit username, email and password
router.put('/edit/:id', isLoggedIn, isTheUserAllowed, (req, res) => {
    const {username, email, password, avatar} = req.body
    User
        .findById(req.params.id)
        .then(user => {
            user.username = username;
            user.email = email;
            avatar !== null ? user.avatar = avatar : null
            if (password !== "") {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                user.password = bcrypt.hashSync(password, salt);
            }
            user.save()
            return user
        }) 
        .then(details => {
            if (isUserFormValid(details.model, req.body, res)) {
                updateDetails(details.id, req.body, details.model, next)
                return details.user
            }
        })
        .then(user=> res.json(user))
        .catch(err => next(err))

})

// get user details
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .populate("personDetails")
        .then(user => res.json(user))
        .catch(err => next(err))
})
module.exports = router