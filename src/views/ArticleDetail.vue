<template>
  <page-frame :color="'white'">
    <div>
      <div class="title">
        <span class="spanTitle">{{ article.title }}</span>
        <span class="spanTime">发表于：{{ dayjs(article.createdate).format('YYYY-MM-DD hh:mm:ss') }}|编辑于：{{ dayjs(article.date).format('YYYY-MM-DD hh:mm:ss') }}</span>
        <div>
          <el-tag
            v-for="i in tags"
            class="mx-2 cursor-pointer"
            :type="typeArr[Math.floor(Math.random() * typeArr.length)]"
            >{{ i.tag_name }}</el-tag
          >
        </div>
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
import { useRoute } from 'vue-router'
import './gitalk/gitalk.css'
import Gitalk from './gitalk/gitalk.min.js'
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
.title {
  padding-top: 50px;
  display: flex;
  // width: 100%;
  flex-direction: column;
  align-items: center;
  .spanTitle {
    // display: block;
    font-size: 30px;
    margin-bottom: 20px;
  }
  .spanTime {
    font-size: 16px;
    color: rgb(73, 73, 73);
  }
}
.left div {
  margin: 20px 50px;
}
</style>
