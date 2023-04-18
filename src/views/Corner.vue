<template>
  <!-- 角落页面 -->
  <div class="classify">
    <div style="height: 50px; background-color: transparent"></div>
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left">
            <div class="mx-3 py-5 text-lg"><i class="fa fa-link"></i>&nbsp;{{ $t('meg.friend') }}</div>
            <div class="mx-3 py-5 text-lg"><i class="fa fa-edit"></i>&nbsp;{{ $t('meg.board') }}</div>
            <div id="gitalk-container"></div>
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
import '@/request/api/types'
import './gitalk/gitalk.css'
import Gitalk from './gitalk/gitalk.min.js'
const spanWidth = ref([2, 13, 1, 6, 2])
const checkWidth = () => {
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

const gitalk = new Gitalk({
  clientID: 'f23a3794037ee7e92a46',
  clientSecret: '85fabb1fefc584abd420b2d16d27f2bb14f8956d',
  repo: 'blogcomment',
  title: 'board',
  owner: 'hibichann', //
  admin: ['hibichann'], //github用户名
  language: window.localStorage.getItem('lang') === 'cn' ? 'zh-CN' : 'en'
})
onMounted(async () => {
  checkWidth()
  gitalk.render('gitalk-container')
})
onBeforeUnmount(() => {})
</script>
<style lang="scss" scoped>
.tags {
  .active {
    background-color: #cfcfcf;
    border-radius: 10px;
  }
  span {
    color: rgb(48, 48, 48);
    display: inline-block;
    margin: 4px;
    padding: 8px;
    font-weight: bolder;
  }
  span:hover {
    color: rgb(148, 148, 148);
    cursor: pointer;
  }
}
.classify {
  background-image: url('../../public/img/bg0.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.left-body {
  background-color: white;
  margin: 50px 0;
  border-radius: 10px;
  padding: 30px 50px;
  // backdrop-filter: blur(5px) brightness(40%);
}
.left {
  width: 100%;
  height: 100%;
  background-color: #fff;
  min-height: 50px;
  border-radius: 10px;
}

.right-body {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  text-align: left;
}
</style>
