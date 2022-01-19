import BingoComponent from '../../src/components/Bingo.vue'
import BingoItemComponent from '../../src/components/Item.vue'
import {getBingoData} from '../../src/service/bingo'
import { mount } from '@vue/test-utils'
import Bingo from '../../src/class/Bingo'
import BingoRule from '../../src/class/BingoRule'
import flushPromises from 'flush-promises'

// jest mock
jest.mock('../../src/service/bingo')

beforeEach(() => {
  jest.clearAllMocks()
})

const mockData = [
  {id: 'a', value: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25'}
]

describe('Bingo Component test : ', () => {
  it('Test if Input value functions normally.', async () => {
    getBingoData.mockResolvedValueOnce(mockData)

    const wrapper = mount(BingoComponent)
    const input = wrapper.find('input')
    expect(wrapper.vm.inputNumber.value).toBe(undefined)

    await input.setValue('2')
    await input.trigger('keyup.enter')

    expect(wrapper.vm.rewardNumber).toStrictEqual(["2"])
  })

  it('Check getBingo api.', async () => {
    const finalData = mockData.map(item => new Bingo(item.id, item.value, new BingoRule(5,3)))

    getBingoData.mockResolvedValueOnce(mockData)
    const wrapper = mount(BingoComponent)
    await flushPromises() // 等候所有的promise callback都執行過才會往下走
    expect(getBingoData).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.bingoes).toStrictEqual(finalData)

    expect(wrapper.findAllComponents(BingoItemComponent)[0].componentVM.bingoContent.data.length).toBe(25)
  })

  it('Test isMatched.', async () => {
    getBingoData.mockResolvedValueOnce(mockData)

    const wrapper = mount(BingoComponent)
    await flushPromises() // 等候所有的promise callback都執行過才會往下走

    const input = wrapper.find('input')
    await input.setValue('2')
    await input.trigger('keyup.enter')
    await input.setValue('5')
    await input.trigger('keyup.enter')

    const totalChild = wrapper.findAll('.w-full.p-3.text-center.border.border-gray-300.rounded-sm')
    const awardChild = totalChild.filter(item => item.classes('bg-red-500'))
    
    expect(totalChild.length).toBe(mockData[0].value.split(',').length)
    expect(awardChild.length).toBe(2)
  })

  it('Test isBingo.', async () => {
    getBingoData.mockResolvedValueOnce(mockData)

    const wrapper = mount(BingoComponent)
    await flushPromises()

    const input = wrapper.find('input')

    // mimic input 15 numbers and check isBingo logic
    let i = 1
    while(i<16) {
      await input.setValue(i.toString())
      await input.trigger('keyup.enter')
      i++
    }

    const totalChild = wrapper.findAll('.mx-auto.my-4').filter(item => item.classes('bg-yellow-300'))
    expect(totalChild.length).toBe(1)
  })
})