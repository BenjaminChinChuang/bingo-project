import BingoItem from './BingoItem'
import BingoRule from './BingoRule'

import {toArray} from './helper'

class Bingo {
  constructor(id, rowData, rule) {
    this.rule = this.checkRules(rule)
    this.id = id
    this.data = this.initData(rowData)
    this.rewardNumber = []
  }

  initData(rowData) {
    const dataArr = toArray(rowData)
    if(dataArr.length !== this.rule.squareNumber * this.rule.squareNumber) {
      throw new Error(`ID: ${this.id} => Bingo data should contain ${this.rule.squareNumber * this.rule.squareNumber} items.`)
    }

    const res = []
    dataArr.forEach(number => {
      res.push(new BingoItem(number, false))
    })

    return res
  }

  checkRules(ruleObject) {
    if(!ruleObject instanceof BingoRule) {
      throw new Error('rule is not BingoRule type!')
    }

    return ruleObject
  }

  getValue() {
    return this.data
  }

  getRewardNumber() {
    return this.rewardNumber
  }
  setRewardNumber(rewardNumber) {
    this.rewardNumber = toArray(rewardNumber)
    this.data.forEach(item => {
      item.isMatched = (this.rewardNumber.indexOf(item.value.toString()) !== -1)
    })
  }

  isBingo(awardIndex) {
    const analysisData = this.data.reduce((acc, item, index) => {
      if(item.isMatched) acc.push(index)
      return acc
    } ,[])

    let count = 0
    awardIndex.forEach((item, index) => {
      const isAward = item.every(n => analysisData.indexOf(n) > -1)
      if(isAward) count ++
    })

    return count >= this.rule.bingoLineNumber
  }
}

export default Bingo