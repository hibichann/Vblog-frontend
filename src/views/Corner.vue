<template>
  <page-frame :color="'white'">
    <div class="mx-3 py-5 text-lg"><i class="fa fa-link"></i>&nbsp;{{ $t('meg.friend') }}</div>
    <div class="linkbody"><link-item v-for="i in 13"></link-item></div>
    <div class="mx-3 py-5 text-lg"><i class="fa fa-edit"></i>&nbsp;{{ $t('meg.board') }}</div>
    <div id="gitalk-container"></div>
  </page-frame>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import '@/request/api/types'
import './gitalk/gitalk.css'
import LinkItem from '@/components/LinkItem.vue'
import Gitalk from './gitalk/gitalk.min.js'

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
  gitalk.render('gitalk-container')
})
</script>
<style lang="scss" scoped>
.linkbody {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
}
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
</style>
