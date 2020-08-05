const euclidean = (orig, w, h, rep) => {
  let start = Date.now()               // start time

  for(let i = 0; i < rep; ++i)         // repeat process
    var pixels = begin(orig, w, h)     // 10 times

  let time = round((Date.now() - start)/rep)  // end time
  return { pixels, time }
}
module.exports = euclidean

round = n => Math.ceil(n*100)/100

const begin = (pixels, w, h) => {
  let orig = Array.from(pixels)     // turn Uint8ClampedArray to Array
  return process(orig.slice(), orig, 4 * w, h) // pass clone to edit
}

const process = (result, orig, w, h) => {

  const edit = (x, y, color) => {   // edit result
    for(let i = 0; i < 3; ++i)
      result[w * y + x + i] = color // color
    result[w * y + x + 3] = 255     // opacity = 100%
  }

  let currR, currB, currG, leftR, leftB, leftG, belowR, belowB, belowG
  let difLR, difLB, difLG, difBR, difBB, difBG, dLeft, dBelow, i

  for(let y = 0; y < h - 1; ++y) {
    for(let x = 4; x < w; x+=4) {
      currR = orig[w * y + x]
      currB = orig[w * y + x + 1]
      currG = orig[w * y + x + 2]

      leftR = orig[w * y + x - 4]
      leftB = orig[w * y + x - 3]
      leftG = orig[w * y + x - 2]
      
      belowR = orig[w * (y + 1) + x]
      belowB = orig[w * (y + 1) + x + 1]
      belowG = orig[w * (y + 1) + x + 2]

      difLR = leftR - currR
      difLB = leftB - currB
      difLG = leftG - currG

      difBR = belowR - currR
      difBB = belowB - currB
      difBG = belowG - currG

      dLeft  = difLR * difLR + difLB * difLB + difLG * difLG
      dBelow = difBR * difBR + difBB * difBB + difBG * difBG

      dLeft > 529 || dBelow > 529 ? 
        edit(x, y, 255)       // above threshold? white
        : edit(x, y, 0)       // below threshold? black
    }
  }

  for(i = 0; i < w; ++i)      // clean last horizontal edge
    result[(h - 1) * w + i] = result[(h - 2) * w + i]

  for(i = 0; i < h - 1; ++i)  // clean first vertical edge
    result[i * w] = result[i * w + 1]

  return result
}