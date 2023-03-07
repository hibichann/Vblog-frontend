<template>
  <!-- 某分类下文章列表页面 -->
  <hello-world-vue
    :type="'cate'"
    :title="menuName"
  ></hello-world-vue>
</template>
<script lang="ts" setup name="/classify/detail">
import HelloWorldVue from '@/components/HelloWorld.vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import { nextTick, onMounted, onBeforeUnmount } from 'vue'
const route = useRoute()
const menuName: string = route.query.menuName as string
onMounted(() => {
  store.commit('switchHighlight', route.query.menuId)
  console.log(store.state.highlightid)
})
onBeforeUnmount(() => {
  //跳转离开重新加载之前取消高亮，防止其他页面错误高亮
  store.commit('switchHighlight', 0)
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
  // background-color: rgb(255, 255, 255);
  // margin: 50px 0;
  // border-radius: 10px;
  // padding: 50px;
  .el-menu-item:deep {
    color: white !important;
  }
  background-color: transparent;
  margin: 50px 0;
  border-radius: 10px;
  padding: 30px 50px;
  backdrop-filter: blur(5px) brightness(40%);
}
.left {
  width: 100%;
  height: 100%;
  color: white;
}
.right-body {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  text-align: left;
}
</style>
