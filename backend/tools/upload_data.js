const express      = require('express')
const router       = express.Router()
const csvtojson    = require('csvtojson')
const ServiceOwner = require('../models/service_owner')
const FILE_PATH    = 'public/raw_data.csv'

// POST localhost:8080/api/upload_data/service_owners
router.post('/service_owners', (req, res) => {
  upload_service_owners(FILE_PATH)
  res.end()
})
module.exports = router

//----------------------------------
//        HELPER FUNCTIONS    
//----------------------------------

function upload_service_owners(filePath) {
  csvtojson()
    .fromFile(filePath)
    .then(csvData => {
      Object.values(groupBy(csvData, 'service_owner')).forEach(serviceOwnerData => {
        let serviceOwner                          = new ServiceOwner;
        const serviceOwnerArr                     = serviceOwnerData[0].service_owner.split(' ')
        serviceOwner.service_owner_first_name     = serviceOwnerArr[0]
        serviceOwner.service_owner_last_name      = serviceOwnerArr[1]
        // serviceOwner.service_owner_cisco_username = serviceOwnerArr[2].replace(/[()]/g, '') // get rid of parantheses
        serviceOwner.controls                     = []

        Object.values(groupBy(serviceOwnerData, 'control_name')).forEach(controlData => {
          let { control_name, control_type, control_description, control_url } = controlData[0]
          control_description = control_description.replace(/  +/g, ' ') // get rid of double spaces
          let control         = { control_name, control_type, control_description, control_url }
          control.services    = []

          Object.values(groupBy(controlData, 'application_name')).forEach(appData => {
            appData.forEach(appDatum => {
              const { application_name, track, sco_first_name, status, timeline, completed_month } = appDatum
              const service = { application_name, track, sco_first_name, status, timeline, completed_month }
              control.services.push(service)
            })
          })
          serviceOwner.controls.push(control)
        })
        serviceOwner.save()
      })
    })
    .then(() => console.log('Finished uploading!'))
}

function groupBy(entries, key) {
  return entries.reduce((accumulator, curr) => {
    (accumulator[curr[key]] = accumulator[curr[key]] || []).push(curr);
    return accumulator;
  }, {});
}