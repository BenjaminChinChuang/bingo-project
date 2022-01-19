<template>
  <div class="w-10/12 mx-auto my-4" :class="{'bg-yellow-300': isBingo}">
    <h3>{{ bingoID }}</h3>
    <ElRow class="w-100" justify="center">
      <ElCol
        class="flex h-12 basis-1/5"
        v-for="({isMatched, value}, index) in data" :key="index"
      >
        <div
          class="w-full p-3 text-center border border-gray-300 rounded-sm"
          :class="{'bg-red-500': isMatched}"
        >
          {{ value }}
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup>
import Bingo from '../class/Bingo'
import {generateRewardIndex} from '../class/helper'

import {computed, ref} from 'vue'

const props = defineProps({
  bingoContent: {
    type: Bingo,
    require: true
  }
})

const {id:bingoID, data:bingoData, rule} = props.bingoContent

const data = computed({
  get: () => bingoData,
  set: (val) => val
})

const rewardIndex = generateRewardIndex(rule.squareNumber)
const isBingo = computed(() => props.bingoContent.isBingo(rewardIndex))


// const awardIndex = generateRewardIndex(5)
// const rewardNumber = '1,2,3,4,5,8,13,18,23,6,11,16,21'
// const mockData = [
//   {id: 'a', value: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25'},
//   {id: 'b', value: '11,45,42,5,8,13,1,2,19,25,27,34,36,30,40,6,10,18,22,33,44,7,21,24,39'},
// ]

// const bingos = new Bingo('a', mockData)
// bingos.setRewardNumber(rewardNumber)
// const data = bingos.getValue()
// console.log(bingos.isBingo(awardIndex))

</script>
