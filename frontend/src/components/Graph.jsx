import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const Graph = props => {

  const [graphData, setGraphData] = useState()

  useEffect(() => {
    let inputData = props.receivedData.inputData
    inputData.sort((a, b) => a.size > b.size ? 1 : -1) // sort by size
    let xData = []
    let yData = []
    for(let el of inputData) {
      xData.push(~~el.size)
      yData.push(~~el.time)
    }
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
        }]
    })
  },[props.receivedData.color, props.receivedData.inputData, props.receivedData.name])

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

export default Graph