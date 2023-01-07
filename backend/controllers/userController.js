// const passport = require("passport");
const User = require('../models/userModel');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { create } = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    try {
        // create user object
        const user = await User.login(email, password, firstName, lastName)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(201).json({ error: error.message })
    }

    // initially set up mssg property
    // res.json({ mssg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    try {
        // create user object
        const user = await User.signup(email, password, firstName, lastName)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(201).json({ error: error.message })
    }

    // initially set up mssg property
    // res.json({ mssg: 'signup user' })
}

// // get all users

// const getUsers = async (req, res) => {
//     const users = await User.find({}).sort({ createdAt: -1 })

//     res.status(200).json(users)
// }


// // sign up a user

// const signupUser = async (req, res) => {
//     const password = req.body.password;
//     const passwordConfirm = req.body.passwordConfirm;

//     const newUser = new User({
//         username: req.body.username,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         passwordConfirm: req.body.passwordConfirm,
//     })

//     if (password != passwordConfirm) {
//         return res.status(404).json({ error: 'Password is not matched' })
//     }

//     User.register(newUser, password, (error, user) => {
//         if (error) {
//             console.log(error);
//         } else {
//             passport.authenticate("local")(req, res, () => {
//                 return res.status(200).json(user)
//             });
//         }
//     })

// }

// // log in user

// const loginUser = async (req, res, next) => {
//     passport.authenticate('local'),
//         (req, res) => {
//             console.log('POST to /login')
//             const user = JSON.parse(JSON.stringify(req.user)) // hack
//             const cleanUser = Object.assign({}, user)
//             if (cleanUser.local) {
//                 console.log(`Deleting ${cleanUser.local.password}`)
//                 delete cleanUser.local.password
//             }
//             res.json({ user: cleanUser })
//         }
// }

// const logoutUser = async (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         } else {
//             res.redirect("/api/user/login");
//         }
//     })
// }

module.exports = { signupUser, loginUser }