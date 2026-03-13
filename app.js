require('dotenv').config()

const express = require('express')
const messageRoute = require('./routes/messageRoute')

const app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', true)
//middleware for parse json body
app.use(express.json())

app.use('/api', messageRoute)

app.get('/', (req, res) => {
    res.send('Welcome to home page')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})