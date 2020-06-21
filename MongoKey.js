const USERNAME = 'atlasAdmin'
const PASSWORD = 'ilovemongo'
const DB_NAME  = 'soxDB' 

const MONGO_KEY = `mongodb+srv://${USERNAME}:${PASSWORD}@soxcluster-dojkn.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

module.exports = MONGO_KEY