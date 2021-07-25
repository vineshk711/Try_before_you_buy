require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// importing routes
const authRoutes = require('./routes/auth')
const userRouters = require('./routes/user')

const PORT = process.env.PORT
const databaseURL = process.env.DB_CONNECTION

const app = express()

// connectng to DB
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB CONNECTED')
})
.catch( (err) => {
    console.log(err)
})


// middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// routes
app.use("/api", authRoutes)
app.use("/api", userRouters)


// connection the server
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

