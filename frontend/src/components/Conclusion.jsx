import React, { useState, useEffect } from 'react'
import { Container }  from 'react-bootstrap'
import axios          from 'axios'

const APIURL = 'http://localhost:8080'

const Conclusion = () => {

  const [_yOpt, setYOpt]          = useState()
  const [_yBrute, setYBrute]      = useState()

  useEffect(() => initData(),[])

  const initData = () => {
    axios                                   // get runtime data
      .get(`${APIURL}/api/runtimes/optimized`)
      .then(res => {
        let yOpt = []
        for(let el of res.data) yOpt.push(~~el.time)
        setYOpt(yOpt)
      })
    axios
      .get(`${APIURL}/api/runtimes/sobel`)
      .then(res => {
        let yBrute = []
        for(let el of res.data) yBrute.push(~~el.time)
        setYBrute(yBrute)
      })
  }

  const getPercentage = () => {
    let total = _yOpt.length
    let num = 0
    for(let i = 0; i < total; ++i)
      if(_yOpt[i] < _yBrute[i]) ++num
    return round(100*num/total)
  }

  const round = n => Math.ceil(n*100)/100

  return (
  <Container id='text' className='textContainer'>
    {_yOpt && _yBrute? 
      <>
      <h5>Conclusion</h5>
      <p>
        In sum, our empirical findings suggest that 
        Euclidean &amp; Sobel edge-detection algorithms 
        demonstrate a linear time complexity to a certain 
        extent after which the complexity 
        becomes quasi-parabolic.
        Thus, the lower bound for our algorithms appears to be
        O(n) while their upper bound appear to be O(n<sup>2</sup>).
      </p>
      <p>
        As for how one edge-detection method fares over the other, 
        our findings suggest that 
        the Euclidean method registers a faster runtime than Sobel's
        for {getPercentage()}% of our datapoints, most of which come from
        working with small to medium image files below 5 megapixels. 
        As for image files above this size, the significant increase
        in number of instances in which Sobel's algorithm registers a faster
        runtime than Euclidean suggests that Sobel's algorithm may perform better
        in processing large image files in certain cases.
      </p></> : <></>}
      <a style={{paddingBottom:'2em'}} href='https://github.com/johnSMUpark/CS3353_Project_4_Image_Processing'>Click Here to See our Source Code on Github</a> 
  </Container>)
}
export default Conclusion