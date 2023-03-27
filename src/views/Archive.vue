<template>
  <!-- 归档页面 -->
  <div class="classify">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left px-2">
            <div class="rounded-lg text-gray-700 py-4 text-center transition-all hover:bg-pink-50">归档</div>
            <div class="content">
              <div class="">
                <div
                  class="text-base font-extrabold"
                  v-for="(i, index) in dates"
                  :key="index"
                >
                  <span>{{ i }}</span>
                  <div
                    v-for="j in list[i]"
                    :key="j.id"
                    class="m-4 flex flex-col cursor-pointer font-light transition-all leading-loose hover:text-indigo-500 hover:bg-pink-50 rounded-md transition-all md:flex-row"
                  >
                    <div class="p-2 font-light transition-all">{{ dayjs(j.createdate).format('M-D') }}</div>
                    <div class="p-2 font-light transition-all">{{ j.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="spanWidth[2]"></el-col>
      <el-col :span="spanWidth[3]">
        <div class="right-body">
          <div class="card-content"><PlainCardVue></PlainCardVue></div></div
      ></el-col>
      <el-col :span="spanWidth[4]"></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import PlainCardVue from '@/components/PlainCard.vue'
import { ElRow, ElCol } from 'element-plus'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
import { getArchive } from '@/request/api'
var dayjs = require('dayjs')
const spanWidth = ref([2, 13, 1, 6, 2])
const checkWidth = () => {
  //低于1080p不显示右侧栏
  if (store.state.isMobile) {
    spanWidth.value[0] = 1
    spanWidth.value[1] = 22
    spanWidth.value[2] = 0
    spanWidth.value[3] = 0
    spanWidth.value[4] = 1
  } else {
    spanWidth.value[0] = 2
    spanWidth.value[1] = 13
    spanWidth.value[2] = 1
    spanWidth.value[3] = 6
    spanWidth.value[4] = 2
  }
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
onMounted(async () => {
  checkWidth()
  list.value = await getArchive()
  dates.value = handleDate(Object.keys(list.value))
  console.log(list.value[dates[1]])
})
</script>
<style lang="scss" scoped>
.classify {
  background-image: url('../../public/img/bg0.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.left-body {
  background-color: rgb(255, 255, 255) !important;
  margin: 50px 0;
  border-radius: 10px;
  padding: 50px !important;
}
.left {
  width: 100%;
  height: 100%;
  div:first-child {
    font-size: 24px;
  }
}
.right-body {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  // padding: 20px;
  // border-radius: 10px;
  // box-shadow: 0 0 2px 2px rgba(187, 187, 187, 0.507);
  text-align: left;
}
</style>
