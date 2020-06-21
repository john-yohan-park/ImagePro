import React, { useState } from 'react'
import { Button          } from 'react-bootstrap'
import Logo                from '../assets/logo.png'
import LogoHover           from '../assets/logoHover.png'

const Header = () => {
  const [ logo , setLogo ] = useState(Logo)
  return (
    <div className='header_div'>
      <div className='logo_container'>
        <a href='/'>
          <img 
            src={logo}
            alt='logo'
            onMouseEnter={() => setLogo(LogoHover)}
            onMouseLeave={() => setLogo(Logo)}
            style={{width:'190px'}}
          />
        </a>
      </div>
      <div className='sco_login_container'>
        <Button className='sco_login_btn'>SCO Login</Button>
      </div>
    </div>
  )
}
  
export default Header