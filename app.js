require('dotenv').config()

const express = require('express')
const cors = require('cors')
const messageRoute = require('./routes/messageRoute')

const app = express()
const port = process.env.PORT || 3000

//cors 
app.use(cors())

//middleware for parse json body
app.use(express.json())

app.use('/api', messageRoute)

app.get('/', (req, res) => {
    res.send('Welcome to home page')
})

app.use((err, req, res, next) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    res.status(500).json({
        error: 'Internal server error'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})