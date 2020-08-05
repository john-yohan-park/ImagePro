import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Procedure = () =>
  <Container id='text' className='textContainer'>
    <h5>Procedure</h5><p></p>
    <p>When the user uploads a file, the application:</p>
    <ol>
      <li>Checks if the loaded image is in jpg format and is below the 13 MB size limit</li>
      <li>Converts the image to an array of pixels</li>
      <li>Repeats each edge-detection algorithm 1 - 10 times</li>
      <li>Loads averaged runtime to database</li>
      <li>Retrieves stored runtime data for each algorithm and plots number of pixels vs. time graph</li>
      <li>Displays processed image to user</li>
      <li>Conducts comparitive analysis using the retrieved runtime data in the Results page</li>
    </ol>
    <p>
      Each algorithm is repeated 1 to 10 times to ensure that the 
      time recorded can be deemed as reasonably accurate. The
      number of times an algorithm is reapeated is  
      determined by the number of pixels in an image. 
      This is dynamically determined since the amount of time
      it takes to process an image is limited the timeout constant 
      as predetermined by our 
      <a href='https://scalegrid.io/blog/understanding-mongodb-client-timeout-options/'> Mongo DB Client</a>. 
      Hence, the time that a user has to wait for 
      his/her image to load may take additional time than 
      the algorithms originally warrant.
    </p>
    <Link style={{paddingBottom:'2em'}} to='/results'>Click Here to Read our Results &amp; Analysis</Link> 
  </Container>
  
export default Procedure