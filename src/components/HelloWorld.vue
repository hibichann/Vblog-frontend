<template>
  <!-- 文章列表页 -->
  <div class="Home">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div
            class="title"
            v-if="title"
          >
            {{ '&nbsp;&nbsp;&nbsp;' + title }}
          </div>
          <CardMDVue
            :id="1"
            v-for="i in 10"
            :key="i"
          ></CardMDVue>
          <div
            :style="{ color: 'white', display: 'flex', 'justify-content': 'space-around' }"
            v-if="props.type === 'home'"
          >
            {{ $t('meg.seemore') }}
          </div>
        </div>
      </el-col>
      <el-col :span="spanWidth[2]"></el-col>
      <el-col :span="spanWidth[3]">
        <div class="right-body">
          <div class="card-content">
            <PlainCardVue></PlainCardVue>
          </div></div
      ></el-col>
      <el-col :span="spanWidth[4]"></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import PlainCardVue from '@/components/PlainCard.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CardMDVue from './CardMD.vue'
import store from '@/store'
const props = defineProps({
  type: {
    type: String,
    default: 'home',
    required: false
  },
  page: {
    type: Number,
    default: 1,
    required: false
  },
  cateId: {
    type: Number,
    default: 100,
    required: false
  },
  title: {
    type: String,
    default: '',
    required: false
  }
})
const title = ref<string>('')
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
onMounted(() => {
  if (props.type === 'cate') {
    title.value = props.title
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>
<style lang="scss" scoped>
.title {
  width: 30%;
  color: rgb(97, 97, 97);
  display: inline-block;
  background-color: #e5e0ff;
  font-size: 18px;
  line-height: 40px;
  border-left: #001e817e solid 5px;
}
.Home {
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
