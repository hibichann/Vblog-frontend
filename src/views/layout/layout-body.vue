<template>
  <div :class="'layout-body'">
    <div style="height: 50px"></div>
    <div class="navbar">
      <div class="navcontent">
        <div class="colorline"></div>
        <nav>
          <div class="indexName">
            <router-link to="/">&nbsp;HIBI</router-link>
          </div>
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
              <div class="languageDiv">
                <div
                  @click="switchLanguage"
                  class="language"
                >
                  <i class="fa fa-language"></i>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <keep-alive> <swiper-body-vue></swiper-body-vue></keep-alive>
    <slot></slot>
    <div class="layout-bottom">bottom</div>
  </div>
</template>

<script lang="ts" name="/123" setup>
import SwiperBodyVue from './SwiperBody.vue'
import { useI18n } from 'vue-i18n'
import store from '@/store'
const i18n = useI18n()
const switchLanguage = () => {
  i18n.locale.value === 'cn' ? (i18n.locale.value = 'en') : (i18n.locale.value = 'cn')
  window.localStorage.setItem('lang', i18n.locale.value)
  location.reload()
}
</script>
<style lang="scss" scoped>
.indexName {
  width: 15vw;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  color: #2cc4af;
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
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.7);
    // display: flex;
    height: 50px;
    z-index: 100;
  }
  nav {
    // position: fixed;
    height: 50px;
    // top: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
  }
  .colorline {
    height: 4px;
    background-image: linear-gradient(to right, rgb(122, 36, 89), rgb(255, 5, 5), rgb(201, 107, 0));
  }
  ul {
    display: flex;
    overflow: hidden;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    li {
      user-select: none;
      display: block;
      min-width: 60px;
      height: 40px;
      font-size: 25px;
      text-align: center;
      line-height: 50px;
      margin-left: 10px;
      margin-right: 10px;
      color: #5c503a;
      .languageDiv div {
        position: relative;
        font-size: 26px;
        top: 0px;
      }
      a {
        display: inline-block;
        font-weight: 600;
        font-size: 18px;
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
        color: #2cc4af;
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
        transition: width 0.5s;
      }
    }
    li:hover {
      // background-color: rgba(7, 140, 150, 0.2);
      transition: background-color 1s;
      // border-radius: 20px
    }
    a:hover + .routeline {
      width: 80%;
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
