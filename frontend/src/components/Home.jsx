import React, { useState, useMemo }     from 'react'
import { Container, Row, Col, Button }  from 'react-bootstrap'
import axios                            from 'axios'
import { useDropzone }                  from 'react-dropzone'
import Graph                            from './Graph'

const MAX_MB = 13
const KB     = 1024
const MB     = 1048576
const APIURL = 'http://localhost:8080'

const Home = () => {
  const [_files, setFiles] = useState([])       // original data
  const [_origURL , setOrigURL ] = useState()

  const [_optURL , setOptURL ] = useState()     // optimal data
  const [_optTime, setOptTime] = useState()
  const [_optData, setOptData] = useState()

  const [_bruteURL , setBruteURL ] = useState() // brute force data
  const [_bruteTime, setBruteTime] = useState()
  const [_bruteData, setBruteData] = useState()

  const onDrop = droppedFiles =>
    droppedFiles.length===1?                  // did user drag & drop 1 file?
      droppedFiles[0].type==='image/jpeg'?    // is it a jpg image file?
      droppedFiles[0].size/MB < MAX_MB?       // is it under max size?
        accept(droppedFiles)                  // if so, accept file for processing
        : alert(`Maximum size of ${MAX_MB} MB exceeded`)
      : alert('Can only upload jpg files')
    : alert('Upload one image at a time')

  const accept = files => {
    reset()
    _files.length?
      setFiles([...[], ...files])
      : setFiles([..._files, ...files])

    setOrigURL(URL.createObjectURL(files[0]))

    let pkg = new FormData()                // package data to send
    pkg.append('image', files[0])
    
    axios                                   // send package
      .post(`${APIURL}/api/images`, pkg) 
      .then(res => {                        // process response
        setOptTime(res.data.optimized.time)
        setBruteTime(res.data.sobel.time)
        setOptURL(getURL(res.data.optimized.pixels, res.data.width, res.data.height))
        setBruteURL(getURL(res.data.sobel.pixels, res.data.width, res.data.height))
      })
      .catch(e  => console.log(e))
    
    axios                                   // gather performance data
      .get(`${APIURL}/api/runtimes/optimized`)
      .then(res => setOptData(res.data))

    axios
      .get(`${APIURL}/api/runtimes/sobel`)
      .then(res => setBruteData(res.data))
  }

  const reset = () => {                     // reset data
    setOrigURL()
    setOptURL()
    setBruteURL()
    setOptTime()
    setBruteTime()
    setOptData()
    setBruteData()
  }

  const getURL = (pixels, w, h) => {
    let canvas    = document.createElement('canvas')
    canvas.width  = w
    canvas.height = h
    let context   = canvas.getContext('2d')
    let imageData = context.createImageData(w, h)
    imageData.data.set(pixels)
    context.putImageData(imageData, 0, 0)
    return canvas.toDataURL()
  }

  const { getRootProps, getInputProps, 
          isDragActive, isDragAccept, isDragReject } = useDropzone({onDrop})
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive? activeStyle : {}),
    ...(isDragAccept? acceptStyle : {}),
    ...(isDragReject? rejectStyle : {})
  }), [isDragActive,isDragAccept,isDragReject])

  const fileSize = () => 
    _files[0].size < KB?
    round(_files[0].size) + ' B' :
      _files[0].size < MB?
        round(_files[0].size/KB) + ' KB' :
        round(_files[0].size/MB) + ' MB'

  const round = n => Math.ceil(n*100)/100

  const addCommas = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <Container>
      <br/>
      <div {...getRootProps({ className: 'dropzone' })} {...getRootProps({style})}>
        <input {...getInputProps()}/>
        <h5 id='instruction'>Drag &amp; drop image, or click to select.</h5>
      </div><br/>
      {_files.length?
        <div style={{textAlign:'center'}}>
          <Row>
            <Col><h5 id='text'>Original</h5></Col>
            <Col><h5 id='text'>Euclidean</h5></Col>
            <Col><h5 id='text'>Sobel</h5></Col>
          </Row>
          <Row>
            <Col id='text'>{fileSize()}</Col>
            <Col id='text'>{_optTime  ? addCommas(_optTime)   + ' ms' : ''}</Col>
            <Col id='text'>{_bruteTime? addCommas(_bruteTime) + ' ms' : ''}</Col>
          </Row>
          <br/>
          <Row>
            <Col>
              {_origURL? 
                <img src={_origURL} style={{width:'100%'}} alt='orig'/> 
                : <h5 id='text'>Loading...</h5>}
            </Col>
            <Col>
              {_optURL? 
                <>
                  <img src={_optURL} style={{width:'100%'}} alt='optimal'/>
                  <a href={_optURL} download='euclidean.jpg'>
                    <Button className='downloadBtn' size='sm'>Download</Button>
                  </a>
                </>
                : <h5 id='text'>Loading...</h5>}
            </Col>
            <Col>
              {_bruteURL? 
              <>
                <img src={_bruteURL} style={{width:'100%'}} alt='brute'/>
                <a href={_bruteURL} download='sobel.jpg'>
                  <Button className='downloadBtn' size='sm'>Download</Button>
                </a>
              </>
              : <h5 id='text'>Loading...</h5>}
            </Col>
          </Row>
          <br/>
          <Row>
            <Col>{_optData?
              <div className='graphBackground'>
                <Graph receivedData={{
                  name: 'Euclidean',
                  inputData: _optData,
                  color: 'rgba(0, 47, 255)'}}/> 
              </div>
              : <></>
            }</Col>
            <Col>{_bruteData?
              <div className='graphBackground'>
                <Graph receivedData={{
                  name: 'Sobel',
                  inputData: _bruteData,
                  color: 'rgba(89, 0, 255)'}}/> 
              </div>
              : <></>
            }</Col>
          </Row>
        </div>
        : <></>}
    </Container>)
}

export default Home

const baseStyle = {
  flex            : 1,
  display         : 'flex',
  flexDirection   : 'column',
  alignItems      : 'center',
  padding         : '20px',
  borderWidth     : 4,
  borderRadius    : 12,
  borderColor     : '#eeeeee',
  borderStyle     : 'dashed',
  backgroundColor : '#fafafa',
  color           : '#bdbdbd',
  outline         : 'none',
  transition      : 'border .24s ease-in-out'
}

const activeStyle = {borderColor: '#2196f3'}
const acceptStyle = {borderColor: '#00e676'}
const rejectStyle = {borderColor: '#ff1744'}