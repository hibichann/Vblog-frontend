<template>
  <div class="card-body">
    <!-- 文章卡片 -->
    <div
      v-if="!(props.reverse % 2) && !store.state.isMobile"
      class="left-body"
      @click="toArticleDetail"
    >
      <img
        :src="imgUrl"
        v-if="imgUrl"
      />
      <span
        v-else
        class="span2"
        >Nothing</span
      >
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
            >&nbsp;{{ dayjs(article?.createdate).format('YYYY-MM-DD') }}
          </div>
          <div @click="handleClick('classify', { id: article?.class, menuName: article?.typename, type: 'cate' })">
            <i class="fa fa-puzzle-piece"></i>
            &nbsp;|&nbsp;{{ article?.typename }}
          </div>
        </div>
        <div
          class="detail"
          v-html="marked(article?.content)"
        ></div>
      </div>
    </div>
    <div
      v-if="props.reverse % 2 && !store.state.isMobile"
      class="left-body"
      @click="toArticleDetail"
    >
      <img
        :src="imgUrl"
        v-if="imgUrl"
      />
      <span
        v-else
        class="span2"
        >Nothing</span
      >
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
  },
  reverse: { type: Number, default: 0 }
})
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
let imgUrl = ref('')
const getImgUrl = () => {
  const regex = /!\[.*\]\((.*?)\)/g
  let match
  while ((match = regex.exec(article.value!.content))) {
    imgUrl.value = match[1]
    console.log('Found image URL:', imgUrl.value)
  }
}
const article = ref(props.article)
const toArticleDetail = () => {
  console.log(123, article.value!.id)
  router.push({ name: 'articleDetail', params: { id: article.value!.id || 1 } })
}
onMounted(async () => {
  getImgUrl()
  // article?.value = (await getarticle?({ id: props.id || 1 })) as any
})
</script>
<style lang="scss" scoped>
.card-body:hover {
  transition: all ease-in 0.2s;
  img {
    object-fit: cover;
    cursor: pointer;
    filter: brightness(1);
    transform: scale(1.2);
    transition: all 0.5s;
  }
}
.card-body {
  box-shadow: 0 0 4px 2px #2e2e2e;
  transition: all ease-in 0.2s;
  margin-top: 2vh;
  height: 180px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  .left-body {
    min-width: 40%;
    display: flex;
    justify-content: space-around;
    background-color: #fbda61;
    background-image: linear-gradient(45deg, #fbda61 0%, #ff5acd 100%);

    overflow: hidden;
    cursor: pointer;
    .span2 {
      color: white;
      font-size: 40px;
      text-shadow: 2px 2px 2px #000000;
      line-height: 180px;
      user-select: none;
    }
    img {
      width: 100%;
      filter: brightness(0.95);
      object-fit: cover;
      transition: all 0.5s;
    }
  }
  .right-body {
    width: 100%;
    z-index: 99;
    background-image: url('../assets/bg1.png');
    background-size: cover;
    display: flex;
    justify-content: space-around;
    .article-body {
      backdrop-filter: blur(5px) brightness(90%);
      padding: 15px;
      width: 100%;
      height: 180px;
      .title {
        position: relative;
        padding: 10px 20px;
        display: block;
        text-align: left;
        height: 40px;
        // top: 10px;
        // left: 10px;
        color: white;
        font-size: 20px;
        font-weight: 500;
        transition: color 0.3s;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 2px 2px 4px #000;
      }
      .title:hover {
        color: rgb(255, 191, 161);
        cursor: pointer;
        text-shadow: -1px -1px 4px #000;
        transition: all 0.2s;
      }
      .about {
        display: flex;
        padding: 0 10px;
        div {
          margin-left: 10px;
          font-size: 14px;
          color: white;
          text-shadow: 2px 2px 4px #000;
        }
      }
      .about div + div {
        color: white;
        cursor: pointer;
        transition: color 0.3s;
        text-shadow: 2px 2px 4px #000;
      }

      .about div + div:hover {
        color: rgb(255, 160, 160);
        cursor: pointer;
        transition: color 0.3s;
      }
      .detail {
        :deep(img) {
          display: none;
        }
        position: relative;
        // white-space: pre;
        width: 100%;
        left: 10px;
        top: 10px;
        padding: 0 10px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: #fff;
        text-shadow: 2px 2px 4px #000;
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
