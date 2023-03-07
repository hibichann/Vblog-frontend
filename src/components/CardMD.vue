<template>
  <div class="card-body">
    <!-- 文章卡片 -->
    <div
      class="left-body"
      @click="toArticleDetail"
    >
      <img src="https://blog.chevereto.com/photos/2022/pexels-prakash-aryal-38326.jpg" />
    </div>
    <div class="right-body">
      <div class="article-body">
        <div
          class="title"
          @click="toArticleDetail"
        >
          {{ article.title }}
        </div>
        <div class="about">
          <div>
            <i
              class="fa fa-calendar"
              aria-hidden="true"
            ></i
            >&nbsp;发表于：{{ dayjs(article.createdate).format('YYYY-MM-DD') }}
          </div>
          <div>
            <i
              class="fa fa-puzzle-piece"
              aria-hidden="true"
            ></i
            >&nbsp;|&nbsp;{{ article.cnname }}
          </div>
        </div>
        <div
          class="detail"
          v-html="marked(article.content.toString())"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getArticle } from '@/request/api'
import { marked } from 'marked'
import router from '@/router'
var dayjs = require('dayjs')
const props = defineProps({
  id: {
    type: Number,
    default: 0,
    required: true
  }
})
const article = ref({
  id: 0,
  title: '文章不存在',
  content: 0,
  date: '2023-02-07T03:20:52.000Z',
  createdate: '2022-11-14T05:57:47.000Z',
  status: 1,
  cnname: ''
})
const toArticleDetail = () => {
  router.push({ name: 'articleDetail', query: { id: article.value.id } })
}
onMounted(async () => {
  article.value = (await getArticle({ id: props.id || 1 })) as any
})
</script>
<style lang="scss" scoped>
.card-body {
  margin-top: 2vh;
  height: 150px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  // box-shadow: 2px 2px 2px 2px rgba(0, 172, 224, 0.37);
  .left-body {
    width: 40%;
    display: flex;
    justify-content: space-around;
    background-color: rgb(141, 25, 25);
    overflow: hidden;
    img {
      width: 100%;
      // height: 150px;
      object-fit: cover;
      transition: all 0.5s;
    }
    img:hover {
      object-fit: cover;
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.5s;
    }
  }
  .right-body {
    width: 60%;
    z-index: 99;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-around;
    .article-body {
      // margin-top: 10px;
      background-color: rgb(255, 255, 255);
      width: 500px;
      height: 150px;
      .title {
        position: relative;
        display: block;
        text-align: left;
        height: 40px;
        top: 10px;
        left: 10px;
        color: black;
        font-size: 20px;
        font-weight: 500;
        transition: color 0.3s;
        color: black;
      }
      .title:hover {
        color: rgb(70, 188, 194);
        cursor: pointer;
        transition: color 0.3s;
      }
      .about {
        display: flex;
        div {
          margin-left: 10px;
          font-size: 14px;
          color: rgb(90, 90, 90);
        }
      }
      .about div + div {
        color: rgb(90, 90, 90);
        cursor: pointer;
        transition: color 0.3s;
      }

      .about div + div:hover {
        color: rgb(53, 137, 141);
        cursor: pointer;
        transition: color 0.3s;
      }
      .detail {
        position: relative;
        // white-space: pre;
        width: 80%;
        left: 10px;
        top: 10px;
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
  }
}
</style>
