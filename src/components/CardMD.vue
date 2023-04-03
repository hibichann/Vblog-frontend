<template>
  <div class="card-body">
    <!-- 文章卡片 -->
    <div
      v-if="!store.state.isMobile"
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
          {{ article?.title }}
        </div>
        <div class="about">
          <div>
            <i
              class="fa fa-calendar"
              aria-hidden="true"
            ></i
            >&nbsp;发表于：{{ dayjs(article?.createdate).format('YYYY-MM-DD') }}
          </div>
          <div @click="handleClick('classify', { id: article?.class, menuName: article?.typename, type: 'cate' })">
            <i class="fa fa-puzzle-piece"></i>
            &nbsp;|&nbsp;{{ article?.typename }}
          </div>
        </div>
        <div
          class="detail"
          v-html="marked(article?.content.toString())"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { marked } from 'marked'
import router from '@/router'
import store from '@/store'
var dayjs = require('dayjs')
const props = defineProps({
  article: {
    type: Object
  }
})
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
const article = ref(props.article)
const toArticleDetail = () => {
  console.log(123, article.value!.id)
  router.push({ name: 'articleDetail', query: { id: article.value!.id || 1 } })
}
onMounted(async () => {
  // article?.value = (await getarticle?({ id: props.id || 1 })) as any
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
  justify-content: flex-start;
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
      width: 100%;
      height: 150px;
      .title {
        position: relative;
        padding: 0 10px;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title:hover {
        color: rgb(70, 188, 194);
        cursor: pointer;
        transition: color 0.3s;
      }
      .about {
        display: flex;
        padding: 0 10px;
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
        width: 100%;
        left: 10px;
        top: 10px;
        padding: 0 10px;
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
