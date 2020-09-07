const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10
//Models
const User = require('../../../models/user.model')

const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()


//Helper functions 
const isLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');
const isTheUserAllowed = (req, res, next) => req.user.id === req.params.id ? next() : null;


const obtainDetailsUpdate = body => {
    const elementToChange = {...body}
    delete elementToChange.username
    delete elementToChange.password
    return elementToChange
}
const isUserFormValid = (body, res) => {
    if (!validationHandler.areRequiredFieldsFilled(body, res)) {
        return false
    }
    return true
}

//edit username and password
router.put('/edit/:id', isLoggedIn, isTheUserAllowed, (req, res, next) => {
    const { username, password, avatar, age, genre } = req.body;
    User
        .findById(req.params.id, password)
        .then(pwd => {
            let hashedPassword = pwd;
            if (password !== "") {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                hashedPassword = bcrypt.hashSync(password, salt);
            }
            User
                .findByIdAndUpdate(req.params.id, {username, password: hashedPassword, avatar, age, genre}, {new: true})
                .then(user=> res.json(user))
                .catch(err => next(err))
        })
        .catch(err => console.log(err))
    }
  )

// get user details
router.get('/:id', (req, res, next) => {
    User
        .findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err))
})
module.exports = router