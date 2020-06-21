const ServiceOwner = require('../models/service_owner')

// GET localhost:8080/api/service_owner/get_all
function getAll(req, res) {
  ServiceOwner
    .find({})
    .exec((err, data) => {
      if (err) console.log('Error happened in backend/controllers/service_owner getAll')
      err ? res.status(500).send(err) : res.status(200).send(data)
    })
}

module.exports = { getAll }