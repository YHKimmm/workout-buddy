require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const path = require("path")

// express
const app = express();

// middleware
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.static(path.join(__dirname, "build")))


// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
});

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

