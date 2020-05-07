
const express   = require('express')
const router    = express.Router() // express route handler
let MongoClient = require('mongodb').MongoClient
const MONGO_KEY = require('../../../MongoKey')

// http://localhost:8080/api/runtimes/optimized
router.get('/optimized', (req, res) => {
  let optData = []
  MongoClient.connect(
    MONGO_KEY,  // unified topology : true times out the mongo client prematurely
    { useNewUrlParser:true, useUnifiedTopology:false }, 
    (e, connection) => {
      if(e) throw e
      connection.db('img_pro').collection('optimized').find()
        .forEach(
          doc => optData.push(doc), // gather all data
          () => {
            connection.close()
            res.end(JSON.stringify(optData))
        })
  })
})

// http://localhost:8080/api/runtimes/sobel
router.get('/sobel', (req, res) => {
  let sobelData = []
  MongoClient.connect(
    MONGO_KEY,  // unified topology : true times out the mongo client prematurely
    { useNewUrlParser:true, useUnifiedTopology:false }, 
    (e, connection) => {
      if(e) throw e
      connection.db('img_pro').collection('sobel').find()
        .forEach(
          doc => sobelData.push(doc), // gather all data
          () => {
            connection.close()
            res.end(JSON.stringify(sobelData))
        })
  })
})

module.exports = router