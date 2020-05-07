import React from 'react'
import { Nav, Navbar }  from 'react-bootstrap'

const Navigation = () =>
  <Navbar variant="dark" className='navbar'>
    <Navbar.Brand href='/' className='nav-text'>ImagePro</Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link href='about'      className='nav-text'>About</Nav.Link>
      <Nav.Link href='abstract'   className='nav-text'>Abstract</Nav.Link>
      <Nav.Link href='procedure'  className='nav-text'>Procedure</Nav.Link>
      <Nav.Link href='results'    className='nav-text'>Results</Nav.Link>
      <Nav.Link href='conclusion' className='nav-text'>Conclusion</Nav.Link>
      <Nav.Link href='https://github.com/johnSMUpark/CS3353_Project_4_Image_Processing' className='nav-text'>Github</Nav.Link>
    </Nav>
  </Navbar>
  
export default Navigation