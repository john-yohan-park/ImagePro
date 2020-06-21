const mongoose        = require('mongoose')
const Schema          = mongoose.Schema
const COLLECTION_NAME = 'sox_control_owners'

const SoxControlOwnerSchema = new Schema ({
  username : { 
    type     : String, 
    required : true  , 
    trim     : true  ,
  },
  password : { 
    type     : String, 
    required : true  , 
    trim     : true  ,
    select   : false ,
  },
  role : {
    type     : String ,
    required : true   ,
    trim     : true   ,
    enum     : ['SCO'],
  }
})

module.exports = mongoose.model('SoxControlOwnerSchema', SoxControlOwnerSchema, COLLECTION_NAME)