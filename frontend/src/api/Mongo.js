import axios from 'axios'

const HOST_NAME = window.location.hostname
const PORT      = 8080
const API_URL   = `http://${HOST_NAME}:${PORT}/api`
// const API_URL = 'http://localhost:8080/api'

export class Mongo {
  getServiceOwnerData(...setFunctions) {
    axios
      .get(`${API_URL}/service_owner/get_all`)
      .then(res => setFunctions.forEach(setFunction => setFunction(res.data)))
  }
}