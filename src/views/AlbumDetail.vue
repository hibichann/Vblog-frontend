<template>
  <!-- 相册详情页 -->
  <div class="classify">
    <div style="height: 50px; background-color: transparent"></div>
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left">
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2022/guerrillabuzz-crypto-pr-5sWL3GQ5iCc-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2021/sergei-akulich-xdj_w3w6dMU-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2022/guerrillabuzz-crypto-pr-5sWL3GQ5iCc-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2021/sergei-akulich-xdj_w3w6dMU-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2022/guerrillabuzz-crypto-pr-5sWL3GQ5iCc-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2021/sergei-akulich-xdj_w3w6dMU-unsplash.jpg" /></div>
            <div class="imgbox"><img src="https://blog.chevereto.com/photos/2023/peter-neumann-unsplash.jpg" /></div>
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
  <div></div>
</template>

<script lang="ts" name="" setup>
import PlainCardVue from '@/components/PlainCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
const spanWidth = ref([2, 13, 1, 6, 2])
const checkWidth = () => {
  //低于1080p不显示右侧栏
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
onMounted(() => {
  checkWidth()
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
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
.imgbox {
  width: 31%;
  overflow: hidden;
  margin: 1px;
  border-top: 5px solid rgb(185, 0, 0);
  box-shadow: 2px 2px 2px 2px rgba(143, 0, 0, 0.342);
}
.imgbox:hover {
  border-top: 5px solid rgb(255, 164, 28);
  transition: all 1s;
}
img {
  height: 300px;
  object-fit: cover;
  //   vertical-align: top;
  transform: scale(1);
  transition: all 0.5s;
  //   padding: 1px;
}
img:hover {
  transform: scale(1.2);
  transition: all 0.5s;
  cursor: pointer;
}
</style>
