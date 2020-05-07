module.exports = app => {
  const imagesRoutes   = require('./endpoints/images')    // map endpoints
  const runtimesRoutes = require('./endpoints/runtimes')
  app.use('/api/images'  , imagesRoutes  )                // to app
  app.use('/api/runtimes', runtimesRoutes)                // to app
}