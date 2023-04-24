<template>
  <page-frame :color="'white'">
    <div class="mx-3 py-5 text-lg"><i class="fa fa-link"></i>&nbsp;{{ $t('meg.friend') }}</div>
    <div class="linkbody">
      <link-item
        v-for="i in linkList"
        :title="i.title"
        :link="i.link"
        :pfp="i.pfp"
        :word="i.word"
      ></link-item>
      <link-item
        v-for="i in 13"
        :title="'fire of fire'"
        :link="'Http://www.baidu.com'"
        :pfp="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ffc2d272d-3899-4af7-a6b0-bcb640b9cdd2%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684892702&t=afefc36151986216d56223d56e1149c0'"
      ></link-item>
    </div>
    <div class="mx-3 py-5 text-lg"><i class="fa fa-edit"></i>&nbsp;{{ $t('meg.board') }}</div>
    <div id="gitalk-container"></div>
  </page-frame>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import '@/request/api/types'
import './gitalk/gitalk.css'
import LinkItem from '@/components/LinkItem.vue'
import Gitalk from './gitalk/gitalk.min.js'
import { getLink } from '@/request/api'
const gitalk = new Gitalk({
  clientID: 'f23a3794037ee7e92a46',
  clientSecret: '85fabb1fefc584abd420b2d16d27f2bb14f8956d',
  repo: 'blogcomment',
  title: 'board',
  owner: 'hibichann', //
  admin: ['hibichann'], //github用户名
  language: window.localStorage.getItem('lang') === 'cn' ? 'zh-CN' : 'en'
})
const linkList = ref<linkList>([])
onMounted(async () => {
  gitalk.render('gitalk-container')
  linkList.value = await getLink()
  console.log(linkList.value)
})
</script>
<style lang="scss" scoped>
.linkbody {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
