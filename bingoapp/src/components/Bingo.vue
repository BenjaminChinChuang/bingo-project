<template>
  <ElRow span="24">
    <ElMenu
      :default-active="activeIndex"
      class="w-full"
      mode="horizontal"
      :unique-opened="true"
      :collapse="false"
      @select="handleSelect"
    >
      <ElMenuItem class="w-1/3" index="1">
        <p class="text-orange-500">輸入抽出號碼</p>
      </ElMenuItem>
      <ElMenuItem class="w-1/3" index="2">Bingo卡中獎瀏覽</ElMenuItem>
      <ElMenuItem class="w-1/3" index="3">中獎Bingo</ElMenuItem>
    </ElMenu>
  </ElRow>

  <section>
    <div>
      <input 
        class="border-2 border-red-500"
        type="text"
        v-model="inputNumber"
        v-on:keyup.enter="inputRewardNumber"
      >
    </div>
    <div class="flex">
      <div class="m-2 border-2 border-gray-500" v-for="(n, index) in rewardNumber" :key="index">
        <p>{{ n }}</p>
      </div>
    </div>
  </section>
  
  <section>
    <Item :bingoContent="b" v-for="(b, index) in bingoes" :key="index" />
  </section>
</template>

<script setup>
  import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'
  import { computed, ref, reactive, onMounted } from 'vue'
  import Item from './Item.vue'
  import Bingo from '../class/Bingo'
  import BingoRule from '../class/BingoRule'
  import {generateRewardIndex} from '../class/helper'
  import axios from 'axios'
  import {getBingoData} from '../service/bingo'

  // set game rule
  const gameRules = new BingoRule(5, 3)

  const bingoes = ref([])
  onMounted(() => {
    getBingoData()
      .then(res => {
        const data = res.map(item => new Bingo(item.id, item.value, gameRules))
        bingoes.value = [...data]
      })
      .catch(err => console.log(err))
  })

  const inputNumber = ref('')
  const rewardNumber = ref([])
  const inputRewardNumber = () => {
    if(!inputNumber.value) return

    rewardNumber.value.push(inputNumber.value)
    bingoes.value.forEach(element => {
      element.setRewardNumber(rewardNumber.value)
    })
    
    inputNumber.value = ''
  }

  const activeIndex = ref('1')
  const activeIndex2 = ref('1')
  const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
  }
</script>
