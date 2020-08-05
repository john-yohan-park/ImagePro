const express    = require('express')
const cors       = require('cors')
const routes     = require('./app/routes')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const PORT = 8080
app.listen(PORT, () => console.log(`backend running on http://localhost:${PORT}`)) // port
routes(app)