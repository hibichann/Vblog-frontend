<template>
  <div>
    <div
      ref="chartDom"
      style="height: 400px; width: 100%"
    ></div>
  </div>
</template>

<script lang="ts" name="" setup>
import { getAllTags } from '@/request/api'
import router from '@/router'
import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import 'echarts-wordcloud'
import { onMounted, ref } from 'vue'

let tagsArr = <allTags>[]
const chartDom = ref<any>(null)
let chart: any = null
const data = ref<any>([])
onMounted(async () => {
  tagsArr = await getAllTags()
  tagsArr.forEach((i) =>
    data.value.push({
      name: i.tag_name,
      value: Math.random() * 100,
      id: i.tag_id
    })
  )

  chart = echarts.init(chartDom.value) as EChartsType
  chart.setOption({
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        keepAspect: false,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [20, 40],
        rotationRange: [-30, 15],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        shrinkToFit: false,
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            // Random color
            return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')'
          }
        },
        emphasis: {
          focus: 'self',
          textStyle: {
            textShadowBlur: 5,
            textShadowColor: '#333'
          }
        },
        data: data.value
      }
    ]
  })
  chart.on('click', (params) => {
    console.log(params)
    router.push({
      name: 'classifyDetail',
      query: { id: params.data.id, menuName: params.data.name, type: 'tag' }
    })
  })
})
</script>

<style lang="scss" scoped></style>
