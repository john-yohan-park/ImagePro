import Home       from './components/Home'
import About      from './components/About'
import Abstract   from './components/Abstract'
import Procedure  from './components/Procedure'
import Results    from './components/Results'
import Conclusion from './components/Conclusion'

export const ROUTES = [
  { path:'/'          , component: Home      },
  { path:'/about'     , component: About     },
  { path:'/abstract'  , component: Abstract  },
  { path:'/procedure' , component: Procedure },
  { path:'/results'   , component: Results   },
  { path:'/conclusion', component: Conclusion},
]