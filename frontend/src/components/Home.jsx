import React, { useState, useEffect }  from 'react'
import { Table, Button, Form }  from 'react-bootstrap'
import BurgerIcon from '../assets/burger.png'
import BurgerIconHover from '../assets/burgerHover.png'
import { Mongo } from '../api/Mongo'
const mongo = new Mongo()

const Home = () => {
  const [ burgerIcon     , setBurgerIcon      ] = useState(BurgerIcon)
  const [ clickedBurger  , setClickedBurger   ] = useState(false)
  const [ filterTransform, setFilterTransform ] = useState('translateX(-100%)')
  const [ burgerVisibility, setBurgerVisibility ] = useState('visible')
  
  const [ collection     , setCollection      ] = useState([])
  const [ originalRows   , setOriginalRows    ] = useState([])
  const [ filteredRows   , setFilteredRows    ] = useState([])
  const [ filteredHeaders, setFilteredHeaders ] = useState([])

  useEffect(() => mongo.getServiceOwnerData(setCollection), [])
  useEffect(() => initRows()   , [collection])
  useEffect(() => initHeaders(), [filteredRows])
  useEffect(() => {
    if (clickedBurger) {
      setFilterTransform('translateX(0%)')
      setBurgerVisibility('hidden')
    }
    else {
      setFilterTransform('translateX(-100%)')
      setBurgerVisibility('visible')
    }
  }, [clickedBurger])


  const initRows = () => {
    let rows = []
    collection
    .forEach(doc => {
      let row = {}
      let soNameObj = {}
      clean(Object.entries(doc))
      .forEach(serviceOwnerPair => {
        if (Array.isArray(serviceOwnerPair[1])) {
          serviceOwnerPair[1].forEach(controlObj => {
            clean(Object.entries(controlObj))
            .forEach(controlPair => {
              if (Array.isArray(controlPair[1])) {
                controlPair[1].forEach(serviceObj => {
                  clean(Object.entries(serviceObj))
                  .forEach(servicePair => row[servicePair[0]] = servicePair[1])
                  rows.push(row)
                })
              }
              else row[controlPair[0]] = controlPair[1]
            })
          })
        }
        else soNameObj[serviceOwnerPair[0]] = serviceOwnerPair[1]
      })// for each doc
      row.service_owner = `${soNameObj.service_owner_first_name} ${soNameObj.service_owner_last_name}`
    })
    setOriginalRows(rows)
    setFilteredRows(rows)
  }// init rows

  const initHeaders = () => {
    let headers = []    
    for (const property in filteredRows[0]) if (property!=='control_url') headers.push(variableToHeader[property])
    headers.sort((l, r) => {
      if (headerArr.indexOf(l) < headerArr.indexOf(r)) return -1
      if (headerArr.indexOf(l) < headerArr.indexOf(r)) return 1
      return 0
    })
    setFilteredHeaders(headers)
    console.log('FILTERED ROW:', filteredRows[0])
  }

  return (
    filteredHeaders===undefined && filteredRows===undefined ? <></> :
  <div className='home_div'>

    {/* FILTER */}
    <div className='filter_div' style={{transform : filterTransform }}>
      <br/><br/>
      <Form.Control
        className   = 'search_box'
        type        = 'text'
        placeholder = 'Type something...'
      /><br/>
      <Form.Control
        className   = 'search_box'
        type        = 'text'
        placeholder = 'Type something...'
      /><br/>
      <Form.Control
        className   = 'search_box'
        type        = 'text'
        placeholder = 'Type something...'
      /><br/>
      <Form.Control
        className   = 'search_box'
        type        = 'text'
        placeholder = 'Type something...'
      />
    </div>

    {/* BURGER */}
    <div
      className='burger'
      onClick={() => setClickedBurger(!clickedBurger)}
      style={{ visibility : burgerVisibility }}
    >
      <img
        src={burgerIcon}
        alt='logo'
        onMouseEnter={() => setBurgerIcon(BurgerIconHover)}
        onMouseLeave={() => setBurgerIcon(BurgerIcon)}
        style={{width:'31px', display : 'flex'}}
      />
    </div>

    {/* X */}
    <div className='x_div'>
    {clickedBurger &&
    <Button 
      className='X_btn'
      onClick={() => setClickedBurger(!clickedBurger)}
    >
      <div className='burger_bar X1'/>
      <div className='burger_bar X2'/>
    </Button>}
    </div>

    {/* TABLE */}
    <Table className='table-bordered data_table'>
      <thead>
        <tr>
          {filteredHeaders.map((key, i) => <th key={i}>{key}</th>)}
        </tr>
      </thead>
      <tbody>{ 
        filteredRows.map((row, i) => {
          const { 
            service_owner, 
            control_name, control_type, control_description, control_url, 
            application_name, track, status, sco_first_name, timeline, completed_month
          } = row
          return (
          <tr>
            <td>{service_owner    }</td>
            <td><a href={control_url}>{control_name     }</a></td>
            <td>{control_type     }</td>
            <td>{control_description}</td>
            <td>{application_name }</td>
            <td>{track            }</td>
            <td>{status           }</td>
            <td>{sco_first_name   }</td>
            <td>{timeline         }</td>
            <td>{completed_month  }</td>
          </tr>
          )
        })
      }</tbody>
    </Table>

  </div>)
}

export default Home

const variableToHeader = {
  service_owner       : 'Service Owner'      ,
  control_name        : 'Control'       ,
  control_type        : 'Type'       ,
  control_description : 'Description',
  application_name    : 'App Name'   ,
  track               : 'Track'              , 
  status              : 'Status'             ,
  sco_first_name      : 'SCO'                ,
  timeline            : 'Timeline'           ,
  completed_month     : 'Completed Month'    ,
}

const headerArr = 
  [ 'Service Owner'      , 'Control' , 'Type'    , 
    'Description', 'App Name', 
    'Track'              , 'Status', 'SCO', 'Timeline'        , 'Completed Month' ]

const clean = arr => {
  let cleanedArr = []
  arr.forEach(pair => { if (pair[0]!=='_id' && pair[0]!=='__v') cleanedArr.push(pair) })
  return cleanedArr
}

// const serviceOwner_strVal = {
//   service_owner_first_name     : '',
//   service_owner_last_name      : '',
//   service_owner_cisco_username : '',
// }







// const renderTableHeader = () => {
//   let headers = []
  
//   let serviceObj = {}
  
//   Object.entries(filteredData[0]).forEach(servicePair => {
//     let key = servicePair[0]
//     let val = servicePair[1]
    
//     if (Array.isArray(val)) {
//       // console.log('ARRAY KEY:', key)
//     }
//     else {
//       serviceObj[key] = val
//     }
//   })

//   let service_owner = `${serviceObj.service_owner_first_name} ${serviceObj.service_owner_last_name}`
//   console.log('SERVICE OWNER:', service_owner)
// }