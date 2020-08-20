const express = require('express')
const router = express.Router()
//Models

const User = require('../../../models/user.model')

//Endpoints to edit username and password

router.post('/edit/:id', (req, res, next) => {
    const { username, email, password, avatar, age, genre, vehicle } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

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
            password: hashPass,
            avatar,
            age,
            genre,
            vehicle 
        })
        .then((response) => res.json(response))
        .catch(err => next(new Error(err)))
})
module.exports = router