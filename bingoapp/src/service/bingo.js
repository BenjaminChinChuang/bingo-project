import axios from 'axios'

// https://leo-mocks-server.at-dev.ruten.com.tw/api/bingo
const getBingoData = () => {
  return new Promise((resolve, reject) => {
    // axios
    //   .get(`https://leo-mocks-server.at-dev.ruten.com.tw/api/bingo`)
    //   .then(res => {
    //     if(res && res.data) resolve(res.data) 
    //   })
    //   .catch(error => reject(error))

    resolve([
      {id: 'a', value: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25'},
      {id: 'b', value: '11,45,42,5,8,13,1,2,19,25,27,34,36,30,40,6,10,18,22,33,44,7,21,24,39'},
    ])
  })
}

export {getBingoData}