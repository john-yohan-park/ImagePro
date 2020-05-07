import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation                                 from './components/Navigation'
import { ROUTES }                                 from './routes'

const App = () => 
  <Router>
    <Navigation/>
    <br/>
    <Switch>
      { ROUTES.map((route,i) => <Route exact key={i} {...route}/>) }
    </Switch>
  </Router>

export default App