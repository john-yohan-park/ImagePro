import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Abstract = () =>
  <Container id='text' className='textContainer'>
    <h5>Abstract</h5>
    <p>
      To run our edge-detection algorithms, we extract an image's 
      array of pixels, which consists of integers between 0
      and 255. Each pixel consists of 4 numbers
      representing the intensity levels of Red, Blue, Green, and 
      Opacity values present in each pixel (for more information about 
      RBGA Color Model, click <a href='https://en.wikipedia.org/wiki/RGBA_color_model'> here</a>).
      Once a pixel is classified as an edge, it is colored white 
      while non-edge pixels are colored black.
    </p>
    <p>
      In Sobel's edge-detection algorithm, we use two 3×3 kernels which 
      <a href='https://en.wikipedia.org/wiki/Kernel_(image_processing)#Convolution'> convolve </a> 
      the pixels in a kernel to calculate the contrast coefficient 
      between one part of an image and another.
    </p>
    <img style={{width:'50%'}} src='https://www.projectrhea.org/rhea/images/thumb/9/91/XY_Kernels.png/750px-XY_Kernels.png' alt='kernel'/><p/>
    <p>Specifically, X-Kernel, with contrasting values in its first and last 
      columns, detects horizontally contrasting pixels while Y-Kernel,
      with contasting values in its first and last rows,
      detects vertically contrasting pixels.
    </p>
    <p>
      If either kernel yields a significant convolution 
      above a specified threshold,
      the kernel's center pixel is classified as an edge.
    </p>
    <p>
      In our custom algorithm, we start from an image's top row
      of pixels and calculate the 
      <a href='https://en.wikipedia.org/wiki/Euclidean_distance'> Euclidean distance </a>
      between a pixel and its left and bottom neighboring pixels
      in terms of their RBG values in place of the x, y, z below:
    </p>
    <img style={{width:'50%'}} src='https://lh3.googleusercontent.com/proxy/0XVEM64Wh2EGhNVgmkiDoXTJbNBOotN8ahf1gfcLlSqcNFZ82PP6djnggC_Qux592t9L6F355b1ayqMY06VB3lPvqkiGdCI-r8QDrEAFJu16Las' alt='euclidean'/><p/>
     <p>
      If a distance above a specified threshold is detected from either of 
      its neighbors, the pixel is classified as an edge.
    </p><p></p>
    <h5>Hypothesis</h5>
    <p>
      Since both algorithms traverse the pixel array once,
      I predict that both edge-detection algorithms will 
      demonstrate a linear runtime complexity of O(n).
    </p>
    <p>
      Since our custom algorithm uses a simpler
      mathematic calculation for determining a pixel's contrast coefficient 
      (Euclidean distance vs. Kernel convolution), I predict that the
      Euclidean method will yield a faster runtime.
    </p>
    <Link style={{paddingBottom:'2em'}} to='/procedure'>Click Here to Read our Procedure</Link>
  </Container>
  
export default Abstract