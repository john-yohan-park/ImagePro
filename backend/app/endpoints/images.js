const express   = require('express')
const router    = express.Router() // express route handler
const multer    = require('multer')
const getPixels = require('get-pixels')
const getEuc    = require('../algorithms/euclidean')
const getSobel  = require('../algorithms/sobel')
let MongoClient = require('mongodb').MongoClient
const MONGO_KEY = require('../../../MongoKey')

// http://localhost:8080/api/images/

// SAVE IMAGE
let storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, 'app/images')}, // store here
  filename: function (req, file, cb) {cb(null, 'original.jpg')}   // in jpg
})
const upload = multer({storage})

// HANDLE POST REQUEST
router.post('/', upload.single('image'), (req, res) => {

  getPixels('app/images/original.jpg', (err, pixels) => {
    let width      = pixels.shape[0]
    let height     = pixels.shape[1]
    let kilopixels = (width * height)/1000

    // dynamically allocate # of reps
    let rep        = getRep(kilopixels) 
    
    let sobel      = getSobel(pixels.data, width, height, rep) // run sobel
    let optimized  = getEuc(pixels.data, width, height, rep) // run optimized
    insert(kilopixels, sobel.time, 'sobel')         // update DB
    insert(kilopixels, optimized.time, 'optimized')
    res                                             // send results
      .status(200)                                  // to frontend
      .json({width, height, sobel, optimized})
  })
})
module.exports = router

const getRep = kilopixels => {
  let rep = 28000/kilopixels
  rep     = Math.floor(rep)
  if (rep > 10)     rep = 10  // max = 10
  else if (rep < 1) rep = 1   // min = 1
  return rep
}

const insert = (size, time, collectionName) => {
  MongoClient.connect(
    MONGO_KEY, // unified topology : true times out the mongo client prematurely
    { useNewUrlParser:true, useUnifiedTopology:false }, 
    (e, db) => {
      if(e) throw e
      let dbo = db.db('img_pro')
      dbo
        .collection(collectionName)
        .insertOne({size, time}, (e, res) => {
          if(e) throw e
          db.close()
      })
  })
}