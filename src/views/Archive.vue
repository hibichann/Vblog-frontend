<template>
  <!-- 归档页面 -->
  <div class="classify">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left px-2">
            <div class="rounded-lg text-3xl p-5 text-gray-700 text-center transition-all hover:bg-pink-50">共计：33</div>
            <div class="content">
              <el-tabs
                tab-position="left"
                v-if="!store.state.isMobile"
              >
                <el-tab-pane :label="'全部'">
                  <div
                    class="px-9 text-base"
                    v-for="(i, index) in dates"
                    :key="index"
                  >
                    <span class="text-2xl font-bold text-yellow-900"> <i class="fa fa-calendar"></i>&nbsp;{{ i }}</span>
                    <div
                      @click="toArt(j.id)"
                      v-for="j in list[i]"
                      :key="j.id"
                      class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-yellow-800 hover:text-blue-600 hover:ml-2 hover:bg-pink-50 md:flex-row"
                    >
                      <div class="p-2 w-1/6 font-midium text-xl transition-all">{{ dayjs(j.createdate).format('M-D') }}</div>
                      <div class="p-2 w-5/6 font-midium text-xl transition-all overflow">{{ j.title }}</div>
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
                    class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-yellow-800 hover:text-blue-600 hover:ml-2 hover:bg-pink-50 md:flex-row"
                  >
                    <div class="p-2 w-1/6 font-midium text-xl transition-all">{{ dayjs(j.createdate).format('M-D') }}</div>
                    <div class="p-2 w-5/6 font-midium text-xl transition-all overflow">{{ j.title }}</div>
                  </div></el-tab-pane
                >
              </el-tabs>
              <div v-else>
                <div
                  class="text-base font-extrabold"
                  v-for="(i, index) in dates"
                  :key="index"
                >
                  <span class="text-2xl font-bold text-yellow-900">{{ i }}</span>
                  <div
                    @click="toArt(j.id)"
                    v-for="j in list[i]"
                    :key="j.id"
                    class="m-4 flex flex-col cursor-pointer rounded-md transition-all leading-loose text-yellow-800 hover:text-blue-600 hover:ml-2 hover:bg-pink-50 md:flex-row"
                  >
                    <div class="w-1/3 text-sm font-midium transition-all"><i class="fa fa-calendar"></i>&nbsp;{{ dayjs(j.createdate).format('M-D') }}</div>
                    <div class="w-2/3 text-xl font-midium transition-all overflow">{{ j.title }}</div>
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
import router from '@/router'
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
const toArt = (id) => {
  router.push({ name: 'articleDetail', query: { id: id || 1 } })
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
let rawDates: any = []
let rawList: any = []
onMounted(async () => {
  checkWidth()
  list.value = await getArchive()
  dates.value = handleDate(Object.keys(list.value))
  rawDates = dates.value
  rawList = list.value
})
</script>
<style lang="scss" scoped>
// * {
//   color: rgb(224, 123, 0);
// }
.overflow {
  text-overflow: ellipsis; /* 溢出显示省略号 */
  overflow: hidden; /* 溢出隐藏 */
  white-space: nowrap; /* 强制不换行 */
}
:deep(.el-tabs__item) {
  font-size: large !important;
  height: 60px;
  line-height: 60px !important;
  font-weight: bolder !important;
  transition-property: all;
  color: darkgoldenrod;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 10px 0 0 10px;
}
:deep(.el-tabs__item:hover) {
  background-color: rgb(255, 234, 210) !important;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
:deep(.el-tabs__active-bar) {
  width: 15px !important;
  height: 15px !important;
  top: 10px !important;
  border-radius: 15px;
  background-color: rgb(116, 139, 170) !important;
}
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
