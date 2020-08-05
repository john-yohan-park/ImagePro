import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Help = () =>
  <Container id='text' className='textContainer'>
    <h5>ImagePro</h5>
    <ul>
      <li>Detects edges of an image and renders the image black &amp; white consisting of its edges</li>
      <li>Runs 2 edge-detection algorithms: Euclidean &amp; Sobel</li>
      <li>Provides empirical analysis on the agorithms' runtime performance and how one fares against the other</li>
    </ul>
    <h5>Notice</h5>
    <Container>
      <p>
        The information we store from uploaded images
        are their number of pixels and times it took for our algorithms 
        to process the images
      </p>
      <p>Built with:</p>
      <div style={{display:'flex'}}>
        <img style={{width:'10%', marginRight:'1em'}} src='https://cdn.iconscout.com/icon/free/png-512/react-4-1175110.png' alt='react-badge'/>
        <img style={{width:'10%', marginRight:'1em'}} src='https://images.tutorialedge.net/images/node.png' alt='node-badge'/>
        <img style={{width:'10%'}} src='https://cdn.iconscout.com/icon/free/png-512/mongodb-3-1175138.png' alt='mongo-badge'/>
      </div>
      <br/>
    </Container>
    <Link style={{paddingBottom:'2em'}} to='/abstract'>Click Here to Read our Abstract</Link>   
  </Container>

export default Help