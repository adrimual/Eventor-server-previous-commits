const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
//calling models
const User = require('../../models/user.model');
const Person = require('../../models/person.model');


//SIGN-UP
router.post('/signup', (req, res, next) => {
    const { username, password } = req.body
    
    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }
    if (password.length < 4) {
        res.status(400).json({
            message: 'Please make your password at least 4 characters long.'
        });
        return;
    }
    User.findOne({ username }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: "Username check went bad :()." });
            return;
        }
        if (foundUser) {
            res.status(400).json({
                message: 'Username taken. Choose another one, please ^^.'
            });
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
            username: username,
            email: email,
            password: hashPass
        });
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({
                    message: 'Saving user to database went wrong :().'
                });
                return;
            }
            //hacer login automatico justo despues del signup
            //con el paquete passport
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                //enviar la informacion del usuario al frontend
                res.status(200).json(aNewUser);
            });
        });
    });
});

//LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: 'Something went wrong authenticating user :('
            });
            return;
        }

        if (!theUser) {
            // "failureDetails" contiene el mensaje de error
            // que viene de  "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Session save went bad :().'
                });
                return;
            }
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

//LOGOUT
router.post('/logout', (req, res, next) => {
    // req.logout() metodo predefinido de passport
    req.logout();
    res.status(200).json({
        message: 'Log out successful!'
    });
});

//verificacion si esta logueado
router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({
        message: 'Unauthorized!'
    });
});

module.exports = router