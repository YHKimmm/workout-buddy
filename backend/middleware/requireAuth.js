const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // verify authentication
    // headers -> application/json
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // token example => 'Bearer drjlkadfjadlfkajfladsfajdsf'
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        // req.user can be called anything ex) req.abc
        req.user = await User.findOne({ _id }).select('_id')
        // next() will be passed and protect to other workout router such as getWorkout, createWorkout etc...
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth