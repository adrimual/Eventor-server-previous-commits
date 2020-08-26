const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
const Person = require('../../../models/person.model')
const ValidationHandler = require("../../../validationHandler")
const validationHandler = new ValidationHandler()


//Helper functions 

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
const updateDetails = (id, body) => {
    user.findByIdAndUpdate(id, obtainDetailsUpdate(body), { new: true })
        .then(response => response)
        .catch(err => console.log(err))
}
//edit username, email and password
router.put('/edit/:id', (req, res) => {
    const {username, email, password, avatar} = req.body
    User
        .findById(req.params.id)
        .then(user => {
            user.username = username;
            user.email = email;
            user.avatar = avatar;
            if (password !== "") {
                const salt = bcrypt.genSaltSync(bcryptSalt);
                user.password = bcrypt.hashSync(password, salt);
            }
            user.save()
            return user
        }) 
        .then(details => {
            if (isUserFormValid(details.model, req.body, res)) {
                updateDetails(details.id, req.body, details.model)
                return details.user
            }
        })
        .then(user=> res.json(user))
        .catch(err => console.log(err))

})

// get user details
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .populate("personDetails")
        .then(user => res.json(user))
        .catch(err=>console.log(err))
})
module.exports = router