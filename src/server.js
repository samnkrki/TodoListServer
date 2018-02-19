import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'

import config from './config/config'
import routes from './app/server.route'

const port = config.port
const app = express()

mongoose.connect(config.dbPath)
var db = mongoose.connection

db.on('open', () => {
    console.log('connected to the database......')
})

db.on('error', (err) => {
    console.log(err)
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', (req, res) => {
    res.send('Todo-list Application')
})

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        msg: err.message,
        stack: err.stack,
    })
})

app.listen(port, () => {
    console.log(`The todo-list server islistening on port ${port}`)
})