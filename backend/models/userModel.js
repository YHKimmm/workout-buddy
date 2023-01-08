const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');
const { db } = require("./workoutModel");

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

// static signup method
// arrow function will not work in this property
userSchema.statics.signup = async function (email, password, firstName, lastName) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filed')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // this keyword => reference the 'User' model itself
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, firstName, lastName, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (email, password, firstName, lastName) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filed')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    // first arg => plain password / sec arg => hashed password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}


const User = mongoose.model('User', userSchema);
module.exports = User

// in case having an error with username is null when registered new user
// User.collection.drop();
