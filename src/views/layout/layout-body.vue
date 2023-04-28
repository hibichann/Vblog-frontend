<template>
  <div :class="'layout-body'">
    <transition
      name="slide-fade"
      appear
    >
      <div
        class="navbar"
        v-if="navShow"
      >
        <div class="navcontent">
          <div class="colorline"></div>
          <nav class="w-full flex justify-around">
            <div class="indexName">
              <router-link to="/">&nbsp;HIBI</router-link>
            </div>
            <div></div>
            <div></div>
            <ul>
              <li>
                <router-link to="/classify"><i class="fa fa-puzzle-piece"></i>&nbsp;{{ store.state.isMobile ? '' : $t('meg.category') }}</router-link>
                <div class="routeline"></div>
              </li>
              <li>
                <router-link to="/archive"><i class="fa fa-tasks"></i>&nbsp;{{ store.state.isMobile ? '' : $t('meg.archive') }}</router-link>
                <div class="routeline"></div>
              </li>

              <!-- !!!TODO 暂停相册开发 -->
              <!-- <li>
              <router-link to="/album"><i class="fa fa-picture-o"></i>&nbsp;{{ store.state.isMobile ? '' : $t('meg.album') }}</router-link>
              <div class="routeline"></div>
            </li> -->
              <li>
                <router-link to="/tags"><i class="fa fa-tag"></i>&nbsp;{{ store.state.isMobile ? '' : $t('meg.tags') }}</router-link>
                <div class="routeline"></div>
              </li>
              <li>
                <router-link to="/corner"><i class="fa fa-diamond"></i>&nbsp;{{ store.state.isMobile ? '' : $t('meg.corner') }}</router-link>
                <div class="routeline"></div>
              </li>
              <li>
                <div
                  @click="switchLanguage"
                  class="language"
                >
                  <i
                    ><svg
                      t="1680510446067"
                      class="icon"
                      viewBox="0 0 1280 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2789"
                      width="32"
                      height="32"
                    >
                      <path
                        fill="rgb(255, 235, 209)"
                        d="M304.2 472.4c-7-24.2-15.6-66.4-15.6-66.4h-1s-8.6 42.2-15.6 66.4l-22.2 75H326zM1232 192H672v640h560c26.6 0 48-21.4 48-48V240c0-26.6-21.4-48-48-48z m-48 240c0 13.2-10.8 24-24 24h-22.8c-13.8 47.2-43.4 94.8-85.4 139.8 16.8 12.8 34.2 25 52.2 36 11 6.8 14.6 21 8.2 32.4l-15.8 27.8c-6.8 11.8-21.8 15.6-33.4 8.6-25.2-15.6-49-32.2-70.8-49.8-21.8 17.4-45.4 34.2-70.8 49.8-11.6 7-26.6 3.2-33.4-8.6l-15.8-27.8c-6.4-11.2-2.8-25.6 8.4-32.4 18.6-11.4 36-23.4 52.2-36-15.8-16.8-29.8-34-42-51.4-8-11.4-4.4-27.2 7.4-34.2l13-7.8 14.6-8.6c10.8-6.4 24.8-3.4 32 6.8 10 14 21.6 28 34.8 41.8 27-28.4 47.6-57.8 60-86.4H824c-13.2 0-24-10.8-24-24v-32c0-13.2 10.8-24 24-24h128v-32c0-13.2 10.8-24 24-24h32c13.2 0 24 10.8 24 24v32h128c13.2 0 24 10.8 24 24zM0 240v544c0 26.6 21.4 48 48 48h560V192H48c-26.6 0-48 21.4-48 48z m117.8 432.2L232.8 334c3.4-9.8 12.4-16.2 22.8-16.2h65c10.2 0 19.4 6.6 22.8 16.2l115 338.2c5.2 15.6-6.2 31.8-22.8 31.8h-45.8a24 24 0 0 1-23-17.2l-18.8-63.8h-120.4l-18.2 63.6c-3 10.2-12.4 17.4-23 17.4H140.6c-16.4 0-28-16.2-22.8-31.8z"
                        p-id="2790"
                      ></path>
                    </svg>
                  </i>
                </div>
              </li>
            </ul>
          </nav>
        </div></div
    ></transition>
    <swiper-body-vue></swiper-body-vue>
    <slot></slot>
    <!-- <div class="layout-bottom">bottom</div> -->
  </div>
</template>

<script lang="ts" name="/123" setup>
import SwiperBodyVue from './SwiperBody.vue'
import { useI18n } from 'vue-i18n'
import store from '@/store'
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
const i18n = useI18n()
const switchLanguage = () => {
  i18n.locale.value === 'cn' ? (i18n.locale.value = 'en') : (i18n.locale.value = 'cn')
  window.localStorage.setItem('lang', i18n.locale.value)
  location.reload()
}
let top = ref(0)
let navShow = ref(true)
onMounted(() => {
  navShow.value = true
  window.addEventListener('scroll', () => {
    top.value = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
  })
})
const route = useRoute()
watch(
  () => route.fullPath,
  (newV, oldV) => {
    navShow.value = true
  }
)
watch(
  top,
  (newValue, oldValue) => {
    // 等距离顶部大于100px的时候再做变化
    console.log(newValue)
    if (newValue > 100 && oldValue) {
      if (newValue > oldValue) {
        navShow.value = false
      } else {
        navShow.value = true
      }
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
.navOn {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s ease-in-out 0.2s;
  transform: translateZ(0);
}
.navOff {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s ease-in-out 0.2s;
  transform: translate3d(0, -100%, 0);
}
.indexName {
  width: 15vw;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  color: rgb(255, 235, 239);
}
.layout-body {
  animation: fadeInDown 0.5s;
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  width: 100%;
  margin: 0 auto;
  .navbar {
    position: fixed;
    overflow: 0.8;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.8);
    // display: flex;
    height: 50px;
    z-index: 100;
  }
  nav {
    // position: fixed;
    height: 50px;
    // top: 0px;
    padding: 0px;
  }
  .colorline {
    height: 4px;
    background-image: linear-gradient(to right, rgb(122, 36, 89), rgb(255, 5, 5), rgb(201, 107, 0));
  }
  ul {
    display: flex;
    overflow: hidden;
    align-items: center;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    li {
      user-select: none;
      display: block;
      min-width: 30px;
      height: 40px;
      text-align: center;
      line-height: 50px;
      margin-left: 10px;
      margin-right: 10px;
      color: rgb(255, 235, 239);
      .language {
        display: block;
        position: relative;
        top: 5px;
      }
      a {
        display: inline-block;
        font-weight: 600;
        font-size: 16px;
        position: relative;
        top: -5px;
      }
      div {
        cursor: pointer;
        display: inline-block;
        font-weight: 600;
        font-size: 16px;
        position: relative;
        top: -5px;
      }
      .active {
        // color: #2cc4af;
        color: bisque;
        animation: aa 0.5s;
        @keyframes aa {
          from {
            transform: rotateX(0deg);
          }
          to {
            transform: rotateX(360deg);
          }
        }
      }
      .active + .routeline {
        width: 100% !important;
        margin: 0 auto;
      }
      .routeline {
        display: block;
        position: relative;
        margin: 0 auto;
        top: -15px;
        height: 3px;
        width: 0px;
        background-color: red;
        transition: width 0.2s;
      }
    }
    li:hover {
      transition: background-color 1s;
    }
    a:hover + .routeline {
      width: 100%;
      margin: 0 auto;
    }
  }
}
.mid-body {
  display: flex;
  justify-content: space-evenly;
  .mid-left {
    padding: 30px;
    // background-color: #2cc4af;
  }
}
</style>
