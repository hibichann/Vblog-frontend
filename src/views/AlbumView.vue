<template>
  <!-- 相册列表 -->
  <div class="classify">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div
            class="left"
            @click="goDetail()"
          >
            <album-left></album-left>
          </div></div
      ></el-col>
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
import AlbumLeft from '@/components/AlbumLeft.vue'
import store from '@/store'
import router from '@/router'
const spanWidth = ref([2, 13, 1, 6, 2])
const checkWidth = () => {
  //低于= 1080p不显示右侧栏
  //@ts-ignore
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
const goDetail = () => {
  router.push({
    name: 'albumDetail'
  })
}
onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
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
  background-color: transparent;
  margin: 50px 0;
  border-radius: 10px;
  padding: 30px 50px;
  backdrop-filter: blur(5px) brightness(40%);
}
.left {
  width: 100%;
  height: 100%;
  color: white;
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
