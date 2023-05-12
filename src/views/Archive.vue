<template>
  <page-frame>
    <div class="rounded-lg text-3xl p-5 text-white text-center transition-all">{{ $t('meg.total') }}：{{ total }}</div>
    <div class="content">
      <el-tabs
        tab-position="left"
        v-if="!store.state.isMobile"
      >
        <el-tab-pane :label="$t('meg.all')">
          <div
            class="px-9 text-base"
            v-for="(i, index) in dates"
            :key="index"
          >
            <span class="text-2xl font-bold text-white"> <i class="fa fa-calendar"></i>&nbsp;{{ i }}</span>
            <div
              @click="toArt(j.id)"
              v-for="j in list[i]"
              :key="j.id"
              style="text-shadow: 0px 0px 2px pink"
              class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-white hover:text-gray-900 hover:ml-2 hover:bg-pink-50 md:flex-row"
            >
              <div class="p-2 w-1/4 font-midium text-xl transition-all">{{ dayjs(j.createdate).format('M-D') }}</div>
              <div class="p-2 w-3/4 font-midium text-xl transition-all overflow">{{ j.title }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="i"
          v-for="i in dates"
        >
          <div
            @click="toArt(j.id)"
            v-for="j in list[i]"
            :key="j.id"
            style="text-shadow: 0px 0px 2px pink"
            class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-white hover:text-gray-900 hover:ml-2 hover:bg-pink-50 md:flex-row"
          >
            <div class="p-2 w-1/4 font-midium text-xl transition-all">{{ dayjs(j.createdate).format('M-D') }}</div>
            <div class="p-2 w-3/4 font-midium text-xl transition-all overflow">{{ j.title }}</div>
          </div></el-tab-pane
        >
      </el-tabs>
      <div v-else>
        <div
          class="text-base font-extrabold"
          v-for="(i, index) in dates"
          :key="index"
        >
          <span class="text-2xl font-bold text-white">{{ i }}</span>
          <div
            @click="toArt(j.id)"
            v-for="j in list[i]"
            :key="j.id"
            style="text-shadow: 0px 0px 2px pink"
            class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-white hover:text-gray-900 hover:ml-2 hover:bg-pink-50 md:flex-row"
          >
            <div class="w-1/3 text-sm font-midium transition-all"><i class="fa fa-calendar"></i>&nbsp;{{ dayjs(j.createdate).format('M-D') }}</div>
            <div class="w-2/3 text-xl font-midium transition-all overflow">{{ j.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </page-frame>
</template>

<script lang="ts" name="" setup>
import { ref, onMounted } from 'vue'
import store from '@/store'
import { getArchive } from '@/request/api'
import router from '@/router'
var dayjs = require('dayjs')
const toArt = (id) => {
  router.push({ name: 'articleDetail', params: { id: id || 1 } })
}
const list = ref({})
const handleDate = (arr) => {
  const dateDiffObj = {}
  arr.forEach((dateStr) => {
    const date = dayjs(dateStr)
    const diff = dayjs().diff(date, 'month')
    dateDiffObj[diff] = dateStr
  })
  const sortedDates = Object.keys(dateDiffObj)
    .sort((a: any, b: any) => a - b)
    .map((diff) => dateDiffObj[diff])
  return sortedDates // ['2023-03', '2022-12']
}
let dates: any = ref([])
const total = ref(0)
onMounted(async () => {
  list.value = (await getArchive()).blogGroups
  total.value = (await getArchive()).total
  dates.value = handleDate(Object.keys(list.value))
})
</script>

<style lang="scss" scoped>
.overflow {
  text-overflow: ellipsis; /* 溢出显示省略号 */
  overflow: hidden; /* 溢出隐藏 */
  white-space: nowrap; /* 强制不换行 */
}
</style>
