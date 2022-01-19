const toArray = v => { // clear data
  return v.toString().replace(/ /g, "").split(',')
}

const generateRewardIndex = squareNumber => {
  const chunk = (arr, len) => {
    const chunks = []
    let i = 0

    while (i < arr.length) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks
  }

  const chunkByMatrixVertical = (arr, squareNum) => {
    const res = []

    for(let i = 0; i < squareNum; i++) {
      res.push(arr.filter((item, index) => index % squareNum === i))
    }

    return res
  }

  const arr = Array.from({length: squareNumber * squareNumber}, (_, i) => i)
  const leftSlashType = arr.filter((n, i) => ((i + 1) % (squareNumber + 1)) === 1)
  const rightSlashType = arr.filter((n, i) => ((i + 1) % (squareNumber - 1)) === 1 && (i + 1) !== 1 && (i + 1) !== squareNumber * squareNumber)
  
  const verticalLineType = chunkByMatrixVertical(arr, squareNumber)
  const horizontalLineType = chunk(arr, squareNumber)

  return [leftSlashType, rightSlashType, ...verticalLineType, ...horizontalLineType]
}

export {toArray, generateRewardIndex}