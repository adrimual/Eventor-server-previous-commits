const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10
//Models
const User = require('../../../models/user.model');
const Person = require('../../../models/person.model');

//Endpoints to edit username and password

router.post('/edit/:id', (req, res, next) => {
    const { username, email, password} = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if (!username || !password) {
        res.json({
            message: "Please, introduce a valid username and password"
        })
        return
    }
        User
            .findById(req.params.id)
            .populate('personDetails')
            .then((user) => {
                user.username = username
                user.email = email
                user.password = hashPass
                user.save()
                return user.personDetails
            })
        // .then((response) => res.json(response))
        .catch(err => next(new Error(err)))
})
module.exports = router