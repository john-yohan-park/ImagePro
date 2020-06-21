const mongoose        = require('mongoose')
const Schema          = mongoose.Schema
const COLLECTION_NAME = 'service_owners'

const ServiceSchema = new Schema ({
  application_name : String,
  track            : String,
  sco_first_name   : String,
  status           : String,
  timeline         : String,
  completed_month  : String,
})

const ControlSchema = new Schema ({
  control_name        : String,
  control_type        : String,
  control_description : String,
  control_url         : String,
  services            : [ ServiceSchema ]
})

const ServiceOwnerSchema = new Schema ({
  service_owner_first_name     : String, 
  service_owner_last_name      : String, 
  // service_owner_cisco_username : String,
  controls                     : [ ControlSchema ]
})

// const ServiceSchema = new Schema ({
//   application_name : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//   },
//   track : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//   },
//   sco_first_name : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//   },
//   status : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//     enum     : 
//       [ 
//         'Not Yet Started', 
//         'In Progress - Pending Control Test', 
//         'In Progress - Pending Evidence Submission',
//         'Evidence - Submitted', 
//         'Certified', 
//         'Completed', 
//         'Out of Scope',
//       ],
//   },
//   timeline : {
//     type     : String,
//     trim     : true  ,
//     required : true  ,
//   },
//   completed_month : {
//     type : String,
//     trim : true  ,
//   },
// })

// const ControlSchema = new Schema ({
//   control_name : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//     unique   : true  ,
//   },
//   control_type : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//   },
//   control_description : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//     unique   : true  ,
//   },
//   control_url : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//   },
//   services : [ServiceSchema]
// })

// const ServiceOwnerSchema = new Schema ({
//   service_owner_first_name : { 
//     type     : String, 
//     required : true  , 
//     trim     : true  ,
//   },
//   service_owner_last_name : { 
//     type     : String, 
//     required : true  , 
//     trim     : true  ,
//   },
//   service_owner_cisco_username : {
//     type     : String,
//     required : true  ,
//     trim     : true  ,
//     unique   : true  ,
//   },
//   controls : [ControlSchema]
// })

module.exports = mongoose.model('ServiceOwnerSchema', ServiceOwnerSchema, COLLECTION_NAME)