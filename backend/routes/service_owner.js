const express       = require('express')
const router        = new express.Router()
const service_owner = require('../controllers/service_owner')

router.route('/get_all').get(service_owner.getAll)

module.exports = router