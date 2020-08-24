const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

//Models
const User = require('../../../models/user.model')
// const Person = require('../../../models/person.model')


//Helper functions 

const obtainDetailsUpdate = body => {
    const elementToChange = {
        ...body
    }
    delete elementToChange.username
    delete elementToChange.email
    delete elementToChange.password
    return elementToChange
}

const updateDetails = (id, body, user) => {
    user.findByIdAndUpdate(id, obtainDetailsUpdate(body), { new: true })
        .then(response => console.log(response))
        .catch(err => console.log(err))
}
//edit username, email and password
router.post('/edit/:id', (req, res) => {
    const {
        username,
        email,
        password,
    } = req.body
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    if (!username || !password) {
        res.json({
            message: "Please, introduce a valid username and password"
        })
        return
    }
    User
        .findByIdAndUpdate(req.params.id, {
            username,
            email,
            password: hashPass
        }, {new: true})
        
        .then(details => {
            updateDetails(details.id, req.body, details.user)
            return details.user
        })
        .then(user=> res.json(user))
        .catch(err => console.log(err))

})

// get user details
router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .populate(details.Person)
        .then(user => res.json(user))
        .catch(err=>console.log(err))
})
module.exports = router