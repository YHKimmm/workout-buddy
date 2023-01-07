require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const cookieParser = require('cookie-parser');
// const session = require("express-session");
// const bodyParser = require("body-parser");

// express
const app = express();

// middleware
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


mongoose.set("strictQuery", false);

// connect to db
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Mongo DB Session
// const MongoDBStore = require("connect-mongodb-session")(session);

// const store = new MongoDBStore({
//     uri: process.env.MONG_URL,
//     collection: "workouts",
// });

// const userStore = new MongoDBStore({
//     uri: process.env.MONG_URL,
//     collection: "users",
// });

// store.on("error", function (error) {
//     console.log(error);
// });


// Initialize Middleware
// app.use(
//     require("express-session")({
//         secret: require('crypto').randomBytes(64).toString('hex'),
//         resave: true,
//         saveUninitialized: false,
//         cookie: { maxAge: 1000 * 60 * 20 }, // 20 minutes
//         store: store
//     })
// );

// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// Use Passport to define the Authentication Strategy
// const User = require("./models/userModel");
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());