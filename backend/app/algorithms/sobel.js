const sobel = (orig, w, h, rep) => {
  let start = Date.now()               // begin time
  
  for(let i = 0; i < rep; ++i)         // repeat process
    var pixels = process(orig, w, h)   // 10 times
  
  let time = round((Date.now() - start)/rep)  // end time
  return { pixels, time }
}
module.exports = sobel

round = n => Math.ceil(n*100)/100

const process = (rgba, w, h) => {

  let kernelX = [ // horizontally scan for vertical contrasts
    [-1, 0, 1],   // [1 2 1] X [-1 0 1]
    [-2, 0, 2],   
    [-1, 0, 1]
  ]
  let kernelY = [ // vertically scan for horizontal contrasts
    [-1, -2, -1], // [-1 0 1] X [1 2 1]
    [ 0,  0,  0],
    [ 1,  2,  1]
  ]
  
  let result = Array.from(rgba.slice())     // clone & turn Uint8ClampedArray to Array

  const convolve = (kernel, x, y) => {      // calculate contrast constant
    let total = 0
    for(let j = 0; j < 3; ++j)
      for(let i = 0; i < 3; ++i)
        total += kernel[j][i] * rgba[(w * (y - 1 + j) + (x - 1 + i)) * 4]
    return total
  }

  const edit = (x, y, color) => {           // edit sobel data
    for(let i = 0; i < 3; ++i)
      result[(w * y + x) * 4 + i] = color   // color
    result[(w * y + x) * 4 + 3] = 255       // opacity = 100%
  }

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      let pixelX = convolve(kernelX, x, y)
      let pixelY = convolve(kernelY, x, y)
      Math.sqrt(pixelX * pixelX + pixelY * pixelY) > 100? // treshold = 1000
        edit(x, y, 255)                     // edge: white
        : edit(x, y, 0)                     // non-edge: black
    }
  }
  return result
}
