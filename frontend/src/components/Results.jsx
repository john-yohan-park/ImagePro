import React, { useState, useEffect } from 'react'
import { Container }  from 'react-bootstrap'
import axios          from 'axios'
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import Dif from './Dif'
import PerDif from './PerDif'

const APIURL = 'http://localhost:8080'

const Results = () => {

  const [_optData, setOptData]     = useState()
  const [_bruteData, setBruteData] = useState()
  const [_xData, setXData]        = useState()
  const [_yOpt, setYOpt]          = useState()
  const [_yBrute, setYBrute]      = useState()

  useEffect(() => initData(),[])

  const initData = () => {
    axios                                   // get runtime data
      .get(`${APIURL}/api/runtimes/optimized`)
      .then(res => {
        let optData = res.data
        setOptData(optData)
        optData.sort((a, b) => a.size > b.size ? 1 : -1)

        let xData = [], yOpt = []
        for(let el of optData) {
          xData.push(~~el.size)
          yOpt.push(~~el.time)
        }
        setXData(xData)
        setYOpt(yOpt)
      })
    axios
      .get(`${APIURL}/api/runtimes/sobel`)
      .then(res => {
        let bruteData = res.data
        setBruteData(bruteData)
        bruteData.sort((a, b) => a.size > b.size ? 1 : -1)

        let yBrute = []
        for(let el of bruteData) yBrute.push(~~el.time)
        setYBrute(yBrute)
      })
  }

  const graph = (xData, yDataOpt, yDataBrute) => {
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display:true, 
            labelString: 'Time [ms]'
          },
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Kilopixels'
          }
        }]
      }
    }

    let blue = 'rgba(0, 0, 255)'
    let orange = 'rgba(255, 102, 0)'

    const graphData = {
      labels: xData,
      datasets: [
        {
          label                     : 'Euclidean',
          fill                      : false,
          lineTension               : 0.1,
          borderColor               : blue,
          pointBackgroundColor      : '#fff',
          pointBorderWidth          : 1,
          pointHoverRadius          : 5,
          pointHoverBackgroundColor : blue,
          pointHoverBorderColor     : blue,
          pointHoverBorderWidth     : 2,
          pointRadius               : 1,
          pointHitRadius            : 10,
          data                      : yDataOpt
        },
        {
          label                     : 'Sobel',
          fill                      : false,
          lineTension               : 0.1,
          borderColor               : orange,
          pointBackgroundColor      : '#fff',
          pointBorderWidth          : 1,
          pointHoverRadius          : 5,
          pointHoverBackgroundColor : orange,
          pointHoverBorderColor     : orange,
          pointHoverBorderWidth     : 2,
          pointRadius               : 1,
          pointHitRadius            : 10,
          data                      : yDataBrute
        }
      ]
    }
    return <Line data={graphData} options={options}/>
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
    <h5>Results</h5>
    <p>
      The following graph highlights the runtime performance of 
      Euclidean vs. Sobel edge-detection algorithms. 
      To the best of my abilities, both were implemented to 
      their greatest optimization potential.
    </p>
    <Container className='graphContainer'>
      {_xData && _yOpt && _yBrute ?
        <div className='graphBackground'>
          {graph(_xData, _yOpt, _yBrute)}
        </div>
        : <></>}
    </Container>
    {_yOpt && _yBrute?
      <>
        <p>
          As seen from above, the difference between the 
          two algorithms appear to be very slight. 
          To better highlight their differences, we will
          explore their contrasts in subsequent graphs. 
          The main takeaway from above is 
          that for the vast majority 
          of instances, the Euclidean method registers a faster time than Sobel's.
          Of the {_yOpt.length} datapoints gathered, Euclidean method measures
          a faster runtime than Sobel {getPercentage()}% of the time.
        </p>
        <p>
          What does come as a surprise is that as the size of an 
          image increases, 
          the number of instances in which Sobel records a faster time 
          than Euclidean also increases, especially beyond the 5 megapixel mark:
        </p>
      </> : <></>
    }
    <Container className='graphContainer'>
      {_optData && _bruteData?
        <div className='graphBackground'>
          <Dif receivedData={{
            name: 'Sobel minus Euclidean',
            opt: _optData,
            brute: _bruteData,
            color: 'rgba(13, 56, 252)'}}/> 
        </div>
        : <></>}
    </Container>
    {_yOpt && _yBrute?
      <>
      <p>
        This could be due to numerous factors:
      </p>
        <ol>
          <li>
            Dynamically determined number of repetitions being
            reduced to 1, making the measurements less reliable
          </li>
          <li>
            Running into speed &amp; memory limitations 
            on our hardware &amp; software
          </li>
          <li>
            Shortcomings in the Euclidean algorithm's 
            implementation, rendering it less scalable than Sobel's
          </li>
        </ol>
      <p>
        Regarding the first scenario, it is likey that the limited 
        repetition in our algorithms plays a factor in contributing to 
        inaccurate measurements. As for the likelihood that 
        this limitation causes such a great degree of inaccuracy that it distorts our  
        data into misleading us to perceive
        Sobel as the faster algorithm than Euclidean for processing certain images,
        such possibility remains uncertain.
        As for the increasing vacillation in our datapoints that 
        appear to be directly proportional to the size of our images, 
        we will examine the runtime difference in our later graph in
        terms of percentages, which is independent from the increasing 
        magnitude of time recorded in our data.
      </p>
      <p>
        As for the second scenario, it is possible that we are 
        running into speed &amp; memory limitations from the 
        hadware as it is the 
        case that the entirety of our data was gathered on 
        a single &nbsp;
        <a href='https://support.apple.com/kb/SP754?viewlocale=en_US&locale=en_US'>
         2017 13" Macbook Pro with Intel i5 dual-core processor with 8 GB of RAM
        </a>. As for the software, 
        it could be the case that our Node backend
        is running into issues finding adequate space of memory at its immediate 
        disposal to process the large array of pixels occupy up to
        nearly 20 million pixels. The possibility of either or both the
        hardware and software aspects of our application playing a factor
        can be suggested by the change in
        trajectory of our runtime complexity from the topmost graph, which remains steadily linear for
        images below 3 megapixels then becomes increasingly parabolic for
        images whose number of pixels exceed this mark.
      </p>
      <p>
        As for our last scenario, it is possible that there exisits a 
        shortcoming in my implementation of the Euclidean algorithm; 
        but, since I had implemented my own understanding of Sobel  
        as well, I do not see how this shortcoming could
        contribute to making Euclidean less scalable than Sobel. 
      </p>
      <p>
        In sum, there are a variety of factors that could contribute
        to our current observation of Sobel registering a faster runtime than 
        Euclidean for some of our large images - whether it be due to limitations
        in hardware &amp; software or lack of repeateated
        measurements for processing large files.
      </p>
      <p>
        To better understand the difference between Euclidean 
        &amp; Sobel, we will now examine their runtime differences in terms of
        <a href='https://en.wikipedia.org/wiki/Relative_change_and_difference'> percentage difference</a>
        , the ratio by which Euclidean is faster than Sobel: 
      </p>
      </> : <></>
    }
    <Container className='graphContainer'>
      {_optData && _bruteData?
        <div className='graphBackground'>
          <PerDif receivedData={{
            name: '% Difference between Sobel & Euclidean',
            opt: _optData,
            brute: _bruteData,
            color: 'rgba(255, 102, 0)'}}/> 
        </div>
        : <></>}
    </Container>
    <p>
      As seen above, the inceasing vacilation of runtime along the X-axis
      as observed from our previous graph is absent due to the 
      fact that percentage difference is independent from the 
      amount of time increasing along the Y-axis.
      Despite having resolved this issue, that the number of instances
      in which Sobel records a faster time than Euclidean
      remains unchanged indicates that the factors that
      contribute to this condition is independent of the increasing 
      vacillations from our previous graph.
    </p>
    <Link style={{paddingBottom:'2em'}} to='/conclusion'>Click Here to Read our Conclusion</Link>
  </Container>)
}
export default Results