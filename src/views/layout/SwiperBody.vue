<template>
  <div
    class="default"
    v-if="ifShow"
  >
    <swiper
      class="mySwiper"
      :modules="modules"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :slides-per-view="1"
      :space-between="0"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      @slideChange="onSlideChange"
      @slideChangeTransitionStart="slideChangeTransitionStart"
      @slideChangeTransitionEnd="slideChangeTransitionEnd"
      @touchStart="onTouchStart"
      @touchEnd="onTouchEnd"
    >
      <swiper-slide
        v-for="(i, index) in imgClass"
        :key="index"
      >
        <div :class="'imgbox ' + i">
          <div class="imgbox">
            <img
              :class="imgClass2"
              :src="'/img/bg' + (index + 1) + '.png'"
            />
            <span class="imgspan2">H</span>
            <span
              @click="scroll1"
              class="imgspan3"
            >
              <i class="fa fa-angle-double-down"></i
            ></span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div
      :class="'search'"
      @click="openSearch"
    >
      <input
        disabled
        class="block text-center appearance-none placeholder-white placeholder-opacity-80 border border-gray-400 rounded-md w-full h-full text-white leading-5 focus:outline-none focus:ring-2 focus:ring-gray-200"
        :value="searchValue"
        placeholder="Click to search"
      />
    </div>
    <div
      class="colorline"
      id="colorline"
    ></div>
    <el-dialog
      width="80%"
      top="25vh"
      v-model="searchDialog"
      :show-close="false"
    >
      <div
        :style="{ color: colorValue }"
        class="transition-all"
      >
        {{ $t('meg.keyword') }}
      </div>
      <input
        :style="{ borderBottomColor: colorValue }"
        v-model="str"
        class="bg-gray-100 transition-all"
        @input="handleSearch"
        @focus="changeFoucs"
        @blur="changeFoucs"
      />
      <div v-for="i in list">
        <div class="art-body">
          <div class="title">{{ i.title }}</div>
          <div
            class="content"
            v-html="marked(i?.content.toString())"
          ></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" name="" setup>
import { marked } from 'marked'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper'
import 'swiper/css'
import { ref, watch, computed } from 'vue'
import router from '@/router'
import { search } from '@/request/api'
const searchValue = ref('')
const searchDialog = ref(false)
const openSearch = () => {
  searchDialog.value = true
}
const ifShow = ref(true)
const str = ref('')
const list = ref<any>([])
//防抖函数
const debounce = (func, wait) => {
  //定时器变量
  let timeout
  return function () {
    //每次触发，先清除定时器
    clearTimeout(timeout)
    //指定多少秒后触发事件操作handler
    timeout = setTimeout(func, wait)
  }
}
const searchFunc = async () => {
  if (str.value !== '') list.value = await search({ str: str.value })
  else list.value = []
}
const handleSearch = debounce(searchFunc, 500)

//颜色
//  ref('#4285f4')
const isFoucs = ref(false)
const changeFoucs = () => {
  isFoucs.value = !isFoucs.value
}
const colorValue = computed(() => {
  if (!isFoucs.value && str.value === '') return '#757575'
  if (str.value === '') return '#007bff'
  else if (list.value.length == 0) return '#f44336'
  else return '#00c851'
})
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue !== '/') {
      ifShow.value = false
    } else {
      ifShow.value = true
    }
  },
  { immediate: true }
)
const modules = [Pagination, Scrollbar, Navigation, Autoplay]
const imgClass2 = ref('')
const imgClass = ref(['imgspan', '', '', '', '', '', '', '', '', ''])
const onTouchStart = () => {
  imgClass2.value = 'imgTouch'
}
const onTouchEnd = () => {
  imgClass2.value = ''
}
const slideChangeTransitionStart = async () => {
  imgClass2.value = 'imgTouch'
}
const slideChangeTransitionEnd = () => {
  imgClass2.value = ''
}
const onSlideChange = (s) => {
  imgClass2.value = ''
  imgClass.value.forEach((item, index) => {
    if (index === s.activeIndex) imgClass.value[s.activeIndex] = 'imgspan'
    else imgClass.value[index] = ''
  })
}
const scroll1 = () => {
  document.getElementById('colorline')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 30px;
  div:first-child {
    margin-bottom: 10px;
  }
}
:deep(.el-dialog__body) {
  padding: 5vw;
  padding-top: 0px;
  input {
    transition: all 0.5s;
    border-bottom: 2px solid;
    width: 100%;
    height: 40px;
    font-size: 24px;
    margin-bottom: 10px;
    line-height: 40px;
  }
  input:focus {
    outline: none;
    border-bottom: 2px solid;
  }
}
.search {
  height: 50px;
  width: 300px;
  border-radius: 10px;
  background-color: transparent;
  position: absolute;
  z-index: 9;
  transform: translate(-50%);
  left: 50%;
  top: 40vh;
  transition: all 1s;
  input {
    background: rgba(0, 0, 0, 0.5);
  }
}
.colorline {
  height: 8px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.7);
  background-image: linear-gradient(to left, rgb(122, 36, 89), rgb(187, 4, 4), rgb(168, 90, 0));
}
img {
  width: 1920px;
  height: 1080px;
  position: relative;
  object-fit: cover;
  top: 0;
  left: 0;
  transition: all 0.5s cubic-bezier(0.04, 0.94, 0.81, 1);
}
.imgTouch {
  position: relative;
  left: 100%;
  object-fit: cover;
  margin: auto;
  filter: sepia(60%);
  transition: all 0.5s cubic-bezier(0.04, 0.94, 0.81, 1);
}
.imgbox {
  position: relative;
  backdrop-filter: blur(10px) sepia(60%);
  text-align: center;
  vertical-align: middle;
  // background-color: rgb(105, 99, 82);
}
.imgspan .imgspan2::before {
  content: '·';
  font-size: 40px;
  line-height: 200px;
  -webkit-text-stroke: 0px rgba(255, 255, 255, 0);
  color: rgb(255, 0, 0);
}
.imgspan .imgspan3 {
  font-size: 150px;
  font-weight: bolder;
  position: absolute;
  transform: translate(-50%);
  top: 40vh;
  left: 50%;
  -webkit-text-stroke: 4px rgb(255, 255, 255);
  animation: trans 2s ease-out infinite alternate;
  @keyframes trans {
    from {
      color: transparent;
    }
    to {
      color: white;
    }
  }
}
.imgspan .imgspan2 {
  font-size: 200px;
  font-weight: bolder;
  position: absolute;
  color: rgb(255, 255, 255);
  transform: translate(-50%);
  top: 0vh;
  left: 50%;
  -webkit-text-stroke: 4px rgb(255, 255, 255);
  transition: color 1s, font-size 1s cubic-bezier(0.04, 0.94, 0.81, 1);
  animation: spanmove ease-out 2s 1;
  @keyframes spanmove {
    0% {
      font-size: 100px;
      color: transparent;
      left: 40%;
    }
    50% {
      font-size: 100px;
      color: transparent;
      left: 50%;
    }
    70% {
      font-size: 100px;
      color: transparent;
      left: 50%;
    }
    100% {
      font-size: 200px;
      color: rgb(255, 255, 255);
      left: 50%;
    }
  }
}

.imgspan .imgspan2:hover {
  color: rgb(255, 255, 255);
  font-size: 250px;
  transition: color 0.5s, font-size 0.5s;
}
.mySwiper {
  display: block;
  width: 100%;
  height: calc(70vh - 50px);
  // height: 60vh;
}
.default {
  display: block;
}

.art-body:hover {
  background-color: #fdf2f8;
  box-shadow: 0 0 10px 10px #fdf2f8;
  transition: all 0.2s;
  .title {
    color: rgb(70, 188, 194);
    cursor: pointer;
    transition: all 0.2s;
  }
}
.art-body {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 150px;
  margin: 10px 0;
  border-radius: 20px;
  transition: all 0.2s;
  .title {
    position: relative;
    padding: 0 10px;
    display: block;
    text-align: left;
    height: 40px;
    top: 10px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    transition: color 0.3s;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    position: relative;
    width: 100%;
    top: 10px;
    padding: 0 10px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-align: left;
  }
}
</style>
