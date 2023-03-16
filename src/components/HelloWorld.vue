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
            v-for="i in list.content"
            :article="i"
            :key="i"
          ></CardMDVue>
          <div class="text-center">
            <div
              class="transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer hover:text-lg hover:leading-6"
              v-if="props.type === 'home'"
            >
              {{ $t('meg.seemore') }}
            </div>
            <div
              v-else
              class="flex flex-1 justify-between"
            >
              <div
                v-show="page !== 1"
                @click="handleClick('up')"
                class="transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer"
              >
                上一页
              </div>
              <div v-show="page === 1"></div>
              <div
                v-show="list.total - page * 10 > 0"
                @click="handleClick('down')"
                class="transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer"
              >
                下一页
              </div>
            </div>
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
import '@/request/api/types'
import { getBlogByPage, getBlogByTag } from '@/request/api'
const props = defineProps({
  type: {
    type: String,
    default: 'home',
    required: false
  },
  id: {
    type: Number,
    default: 1,
    required: true
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
const page = ref(1)
const list = ref<any>({ content: {} })
const handleList = async (page) => {
  if (props.type === 'cate') {
    list.value = await getBlogByPage({ page, classid: props.id })
  } else if (props.type === 'tag') {
    list.value = await getBlogByTag({ page, tagid: props.id })
  } else {
    list.value = await getBlogByPage({ page: 1 })
  }
}
const handleClick = (text) => {
  if (text === 'down') {
    page.value += 1
    handleList(page.value)
  } else if (text === 'up') {
    page.value -= 1
    handleList(page.value)
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
onMounted(async () => {
  console.log(123, props)

  title.value = props.title
  checkWidth()
  window.addEventListener('resize', checkWidth)
  list.value = await handleList(page.value)
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
