const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./router/router')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.d8ulk.mongodb.net/RedditClone`)

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))