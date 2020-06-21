const mongoose  = require('mongoose')
const MONGO_KEY = require('../../MongoKey')

function connect() {
  const options = {
    useNewUrlParser    : true,
    useUnifiedTopology : true
  }
  mongoose.connect(MONGO_KEY, options, err => {
    err ?
      console.log('Failed to connect to Mongo!')
      : console.log('Connected to Mongo!')
  })
}// connect

exports.connect = connect