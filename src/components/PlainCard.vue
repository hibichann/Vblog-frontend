<template>
  <div>
    <!-- card4移动到了第二张的位置 -->
    <div class="first">
      <div class="content">
        <img
          src="/img/test.jpg"
          class="pfp"
        />
        <span class="name">Hibichann</span>
        <div class="info">
          <div @click="handleClick('archive')">
            <span>{{ $t('meg.articles') }}</span
            ><span>ZH&nbsp;{{ card1?.art.cnTotal }}&nbsp;/&nbsp;EN&nbsp;{{ card1?.art.enTotal }}</span>
          </div>
          <div @click="handleClick('classify')">
            <span>{{ $t('meg.category') }}</span
            ><span>{{ card1?.cate }}</span>
          </div>
          <div @click="handleClick('tags')">
            <span>{{ $t('meg.tags') }}</span
            ><span>{{ card1?.tag }}</span>
          </div>
        </div>
        <a
          alt="'coder101011@outlook.com'"
          href="mailto:Hibi<coder101011@outlook.com>"
        >
          <i class="fa fa-envelope"></i
        ></a>
      </div>
    </div>
    <div class="fourth">
      <div class="content">
        <div class="category">
          <i class="fa fa-tasks"></i><span>&nbsp;&nbsp;{{ $t('meg.finNew') }}</span>
        </div>
        <div
          class="body"
          v-for="i in card4"
          :key="i.id"
        >
          <div class="art">
            <div class="title">
              <div @click="toArticleDetail(i.id)">{{ i.title }}</div>
            </div>
            <div class="content1">
              <div>{{ i.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="content">
        <div>
          <i class="fa fa-tag"></i><span>&nbsp;&nbsp;{{ $t('meg.tags') }}</span>
        </div>
        <div class="tags">
          <span
            v-for="i in card2"
            :key="i.tag_id"
            @click="handleClick('classifyDetail', { id: i.tag_id, menuName: i.tag_name, type: 'tag' })"
            >{{ i.tag_name }}</span
          >
        </div>
      </div>
    </div>
    <div class="third">
      <div class="content">
        <div class="category">
          <i class="fa fa-puzzle-piece"></i><span>&nbsp;&nbsp;{{ $t('meg.category') }}</span>
        </div>
        <div><CateMenuVue></CateMenuVue></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="" setup>
import CateMenuVue from '@/components/CateMenu.vue'
import { getAllTags, getCard1, getCard4 } from '@/request/api'
import '@/request/api/types'
import router from '@/router'
import { onMounted, ref } from 'vue'
const card1 = ref<card1 | null>(null)
const card2 = ref<allTags | null>(null)
const card4 = ref<any | null>(null)
onMounted(async () => {
  card1.value = await getCard1()
  card2.value = await getAllTags()
  card4.value = await getCard4()
})
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
const toArticleDetail = (id) => {
  router.push({ name: 'articleDetail', params: { id } })
}
</script>

<style lang="scss" scoped>
.first,
.second,
.third,
.fourth {
  user-select: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255);
}
.first .content {
  display: flex;
  align-items: center;
  flex-direction: column;
  .name {
    font-size: 20px;
  }
  i {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .pfp:hover,
  i:hover {
    cursor: pointer;
    animation: aa 0.5s;
    @keyframes aa {
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(360deg);
      }
    }
  }
  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 20px;
  }
  .info {
    margin: 20px 0;
    width: 100%;
    display: flex;
    width: 90%;
    flex-direction: row;
    justify-content: space-evenly;
    div {
      flex: 1;
      cursor: pointer;
      span {
        display: block;
        text-align: center;
      }
      span:last-child {
        font-size: 14px;
      }
    }
    div:hover {
      color: rgb(69, 165, 165);
    }
  }
}
.second .content {
  font-size: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  div:first-child {
    margin-bottom: 15px;
  }
  .tags {
    span {
      color: rgb(48, 48, 48);
      display: inline-block;
      font-size: 16px;
      padding: 8px;
    }
    span:hover {
      color: rgb(148, 148, 148);
      cursor: pointer;
    }
  }
}
.third .content {
  font-size: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  .category {
    // display: flex;
    height: 30px;
  }
}
.fourth .content {
  font-size: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  .body {
    display: flex;
    margin: 10px 20px;
    border-bottom: 1px solid rgb(206, 206, 206);
  }
  .category {
    // display: flex;
    height: 30px;
  }
  img {
    margin-top: 2px;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  .art {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      padding: 5px 10px;
      flex: 1;
      min-width: 0;
      width: 80%;
      font-size: 18px;
      color: rgb(58, 58, 58);
      div {
        overflow: hidden;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .title:hover {
      color: rgb(76, 173, 173);
      cursor: pointer;
    }
    .content1 {
      flex: 1;
      padding: 5px 10px;
      min-width: 0;
      font-size: 14px;
      min-width: 0;
      width: 100%;
      div {
        overflow: hidden;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
