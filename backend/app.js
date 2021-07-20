require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT
const databaseURL = process.env.DB_CONNECTION

const app = express()

// connectng to DB

// mongoose.connect(databaseURL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('DB CONNECTED')
// })

 console.log(process.env.abc)

// connection the server

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

