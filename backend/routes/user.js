const express = require('express')

// controller functions
const { loginUser, signupUser, getUser, getUsers } = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


module.exports = router