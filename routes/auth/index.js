const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../../models/user.model")
const bcrypt = require("bcrypt")


router.post('/signup', (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    
    if (!username || !password) {
        res.status(400).json({ message: 'Introduce username or password' })
        return
    }

    if (password.length < 4) {
        res.status(400).json({ message: 'Please, provide a password with four characters or more ^^.' });
        return
    }

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "User not found" })
            return
        }

        if (foundUser) {
            res.status(400).json({ message: 'User already taken, please use another one' })
            return
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)

        var aNewUser = new User({
            username: username,
            password: hashedPassword
        })

        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: "Couldn't save user in the database" });
                return
            }

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: "Couldn't initiate session after creating the user" })
                    return
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser)
            })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Wrong user or password.' })
            return
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: "The session couldn't be saved" })
                return
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser)
        })
    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout()
    res.status(200).json({ message: 'Session closed' })
})

router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user)
        return
    }
    res.status(403).json({ message: 'Unauthorized!' })
})

module.exports = router