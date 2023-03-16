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
      :class="'search ' + searchClass"
      @click="openSearch"
    >
      <input
        class="block text-center appearance-none placeholder-white placeholder-opacity-80 border border-gray-400 rounded-md w-full h-full text-white leading-5 focus:outline-none focus:ring-2 focus:ring-gray-200"
        :value="searchValue"
        @blur="handleBlur"
        placeholder="Tap to search"
      />
    </div>
    <div
      class="colorline"
      id="colorline"
    ></div>
  </div>
</template>

<script lang="ts" name="" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper'
import 'swiper/css'
import { ref, watch } from 'vue'
import router from '@/router'

const searchValue = ref('')
const searchClass = ref('')
const openSearch = () => {
  searchClass.value = 'searchClass'
}
const handleBlur = () => {
  searchClass.value = ''
  searchValue.value = ''
}

const ifShow = ref(true)
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
.searchClass {
  position: fixed;
  font-size: x-large;
  width: 70%;
  height: 60px;
  top: 200px;
  transition: all 0.5s;
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
</style>
