import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header                                     from './components/Header'
import Footer                                     from './components/Footer'
import { ROUTES }                                 from './routes'

const App = () => 
  <Router>
    <Header/>
    <Switch>
      { ROUTES.map((route,i) => <Route exact key={i} {...route}/>) }
    </Switch>
    <Footer/>
  </Router>

export default App