<template>
  <!-- 文章详情页面 -->
  <div class="classify">
    <div class="shadow"></div>
    <div style="height: 50px; background-color: transparent"></div>
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div
          class="left-body"
          :style="{ backgroundColor: props.color, backgroundImage: props.image }"
        >
          <div class="left">
            <slot></slot>
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
import { onMounted, ref } from 'vue'
import store from '@/store'
const props = defineProps(['color', 'image'])
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
onMounted(async () => {
  checkWidth()
})
</script>
<style lang="scss" scoped>
.shadow {
  width: 100%;
  box-shadow: 0 0 20px 20px rgba(0, 70, 107, 0.637);
}
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
  backdrop-filter: blur(5px) brightness(60%);
}
.left {
  // display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  min-height: 50px;
  // border-radius: 10px;
  div {
    margin: 20px 50px;
  }
}
.right-body {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  text-align: left;
}
</style>
