<template>
  <div>
    <div class="first">
      <div class="content">
        <img
          src="/img/test.jpg"
          class="pfp"
        />
        <span class="name">Hibichann</span>
        <div class="info">
          <div>
            <span>{{ $t('meg.articles') }}</span
            ><span>123</span>
          </div>
          <div>
            <span>{{ $t('meg.category') }}</span
            ><span>34</span>
          </div>
          <div>
            <span>{{ $t('meg.tags') }}</span
            ><span>46</span>
          </div>
        </div>
        <i class="fa fa-envelope"></i>
      </div>
    </div>
    <div class="second">
      <div class="content">
        <div>
          <i class="fa fa-tag"></i><span>&nbsp;&nbsp;{{ $t('meg.tags') }}</span>
        </div>
        <div class="tags">
          <span class="active">Vue</span>
          <span>Jdposmf</span>
          <span>my3sql</span>
          <span>标签</span>
          <span>Jdposmf</span>
          <span>mysql</span>
          <span>Vue</span>
          <span>Jdposmf</span>
          <span>Vue</span>
          <span>Jdposmf</span>
          <span>mys33ql</span>
          <span>标签</span>
          <span>mysql</span>
          <span>标签</span>
          <span>Vue</span>
          <span>Jdposmf</span>
          <span>mysql</span>
          <span>标签</span>
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
    <div class="fourth">
      <div class="content">
        <div class="category">
          <i class="fa fa-tasks"></i><span>&nbsp;&nbsp;{{ $t('meg.finNew') }}</span>
        </div>
        <div
          class="body"
          v-for="i in 5"
          :key="i"
        >
          <div class="img"><img src="https://pic2.zhimg.com/v2-8cc589398d0576b41e365af19b9e9325_r.jpg" /></div>
          <div class="art">
            <div class="title"><div>Vuejs文章标题Vuejs文章标题Vuejs文章标题Vuejs文章标题Vuejs文章标题Vuejs文章标题Vuejs文章标题</div></div>
            <div class="content1"><div>Vuejs文章正文Vuejs文章正文Vuejs文章正文Vuejs文章正文Vuejs文章正文Vuejs文章正文Vuejs文章正文</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="" setup>
import CateMenuVue from '@/components/CateMenu.vue'
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
    flex-direction: row;
    justify-content: space-evenly;
    div {
      flex: 1;
      cursor: pointer;
      span {
        display: block;
        text-align: center;
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
    .active {
      background-color: #cfcfcf;
      border-radius: 10px;
    }
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
      font-size: 16px;
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
      font-size: 12px;
      min-width: 0;
      width: 80%;
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
