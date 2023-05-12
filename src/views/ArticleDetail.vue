<template>
  <page-frame :image="'linear-gradient(0deg, #edfffd 0%, #ffebeb 100%)'">
    <div class="title">
      <span class="spanTitle">{{ article.title }}</span>
      <span class="spanTime">{{ dayjs(article.createdate).format('YYYY-MM-DD hh:mm:ss') }}</span>
      <div>
        <span
          v-for="i in tags"
          @click="handleClick('classifyDetail', { id: i.tag_id, menuName: i.tag_name, type: 'tag' })"
          style="background-color: #ff3cac; background-image: linear-gradient(225deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%)"
          class="mx-1 px-2 py-0.5 rounded cursor-pointer text-white"
          >{{ i.tag_name }}</span
        >
      </div>
    </div>
    <div
      class="markdown-body pb-24"
      v-highlight
      v-html="marked(article.content.toString())"
    ></div>
    <div id="gitalk-container"></div>
    <div class="h-10"></div>
  </page-frame>
</template>

<script lang="ts" name="" setup>
import { getArticle, getTag } from '@/request/api'
import { marked } from 'marked'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import './gitalk/gitalk.css'
import Gitalk from './gitalk/gitalk.min.js'
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
var dayjs = require('dayjs')
const article = ref({
  id: 0,
  title: '文章不存在',
  content: 0,
  date: '2023-02-07T03:20:52.000Z',
  createdate: '2022-11-14T05:57:47.000Z',
  status: 1,
  cnname: ''
})
const gitalk = new Gitalk({
  clientID: 'f23a3794037ee7e92a46',
  clientSecret: '85fabb1fefc584abd420b2d16d27f2bb14f8956d',
  repo: 'blogcomment',
  title: 'Article Id:' + article.value.id,
  owner: 'hibichann',
  admin: ['hibichann'],
  language: window.localStorage.getItem('lang') === 'cn' ? 'zh-CN' : 'en'
})
const route = useRoute()
const tags = ref<allTags>([])
const typeArr = ref(['', 'success', 'info', 'warning', 'danger'])
onMounted(async () => {
  article.value = (await getArticle({ id: route.params.id! as unknown as number })) as any
  gitalk.render('gitalk-container')
  tags.value = await getTag({ id: route.params.id! as unknown as number })
})
</script>

<style lang="scss" scoped>
.markdown-body {
  // background-image: linear-gradient(0deg, #fffced 0%, #ffebeb 100%);
  background-color: transparent;
  margin: 0 !important;
}
// :deep(pre) {
//   background-color: transparent;
// }
// :deep pre {
//   background-color: transparent;
// }
.title {
  padding-top: 50px;
  display: flex;
  margin: 0 !important;
  // width: 100%;
  flex-direction: column;
  align-items: center;
  .spanTitle {
    // display: block;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .spanTime {
    font-size: 16px;
    color: rgb(73, 73, 73);
  }
  div span {
    display: inline-block;
    font-size: 14px;
    box-shadow: 0 0 3px #888;
    background: linear-gradient(to right, #df4c9f 0%, #784ba0 50%, #2b86c5 100%);
    background-size: 200%;
    transition: all ease-in 0.2s;
  }
  div span:hover {
    color: rgb(255, 255, 255);
    cursor: pointer;
    box-shadow: -2px -2px 3px #888;
    background-position: 100% 0;
    transition: all ease-in 0.2s;
  }
}
.left div {
  margin: 20px 50px;
}
</style>
