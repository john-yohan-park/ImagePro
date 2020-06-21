const express = require('express')
const cors    = require('cors')
const mongo   = require('./database/mongo')
const route   = require('./route')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
mongo.connect()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`backend running on http://localhost:${PORT}`))
route(app)