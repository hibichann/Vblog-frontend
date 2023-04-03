<template>
  <!-- 文章详情页面 -->
  <div class="classify">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left">
            <div class="title">
              <span class="spanTitle">{{ article.title }}</span>
              <span class="spanTime">发表于：{{ dayjs(article.createdate).format('YYYY-MM-DD hh:mm:ss') }}|编辑于：{{ dayjs(article.date).format('YYYY-MM-DD hh:mm:ss') }}</span>
            </div>
            <div
              class="markdown-body pb-24"
              v-highlight
              v-html="marked(article.content.toString())"
            ></div>
            <div id="gitalk-container"></div>
            <div class="h-10"></div>
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
import { getArticle } from '@/request/api'
import { marked } from 'marked'
import { ElRow, ElCol } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'
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
//@ts-ignore
const gitalk = new Gitalk({
  clientID: 'f23a3794037ee7e92a46',
  clientSecret: '85fabb1fefc584abd420b2d16d27f2bb14f8956d',
  repo: 'blogcomment',
  title: article.value.id,
  owner: 'hibichann', //
  admin: ['hibichann'], //github用户名
  language: window.localStorage.getItem('lang') === 'cn' ? 'zh-CN' : 'en'
})
const route = useRoute()
onMounted(async () => {
  article.value = (await getArticle({ id: route.query.id! as unknown as number })) as any
})
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
onMounted(() => {
  checkWidth()
  gitalk.render('gitalk-container')
})
</script>
<style lang="scss" scoped>
.classify {
  background-image: url('../../public/img/bg0.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.left-body {
  background-color: transparent;
  margin: 50px 0;
  border-radius: 10px;
  backdrop-filter: blur(5px) brightness(40%);
}
.left {
  // display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  min-height: 50px;
  border-radius: 10px;
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
  div {
    margin: 50px;
  }
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
