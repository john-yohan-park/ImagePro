module.exports = app => {
  const uploadDataRoutes   = require('./tools/upload_data'   )
  const serviceOwnerRoutes = require('./routes/service_owner')

  app.use('/api/upload_data'  , uploadDataRoutes  )
  app.use('/api/service_owner', serviceOwnerRoutes)
}