import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const PerDif = props => {

  const [graphData, setGraphData] = useState()

  useEffect(() => {
    let opt = props.receivedData.opt.sort((a, b) => a.size > b.size ? 1 : -1) // sort by size
    let brute = props.receivedData.brute.sort((a, b) => a.size > b.size ? 1 : -1)

    let xData = [], yData = [], zeroData = [], bt, ot

    for(let i = 0; i < opt.length; ++i) {
      xData.push(~~brute[i].size)
      bt = brute[i].time
      ot = opt[i].time 
      yData.push(~~(
        200 * (bt - ot) / (bt + ot)
      ))
      zeroData.push(0)
    }

    let zeroColor = 'rgba(0, 0, 0)'

    setGraphData({
      labels: xData,
      datasets: [
        {
          label                     : props.receivedData.name,
          fill                      : false,
          lineTension               : 0.1,
          borderColor               : props.receivedData.color,
          pointBackgroundColor      : '#fff',
          pointBorderWidth          : 1,
          pointHoverRadius          : 5,
          pointHoverBackgroundColor : props.receivedData.color,
          pointHoverBorderColor     : props.receivedData.color,
          pointHoverBorderWidth     : 2,
          pointRadius               : 1,
          pointHitRadius            : 10,
          data                      : yData
        },
        {
          label                     : '',
          fill                      : false,
          lineTension               : 0.1,
          borderColor               : zeroColor,
          pointBackgroundColor      : '#fff',
          pointBorderWidth          : 1,
          pointHoverRadius          : 5,
          pointHoverBackgroundColor : zeroColor,
          pointHoverBorderColor     : zeroColor,
          pointHoverBorderWidth     : 2,
          pointRadius               : 1,
          pointHitRadius            : 10,
          data                      : zeroData
        }
      ]
    })
  },[props.receivedData.name, props.receivedData.color, props.receivedData.opt, props.receivedData.brute])

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

  return graphData? <Line data={graphData} options={options}/> : <></>
}

export default PerDif