<template>
  <!-- 某分类/标签下文章列表页面 -->
  <hello-world-vue
    :type="type"
    :title="menuName"
    :id="id"
  ></hello-world-vue>
</template>
<script lang="ts" setup name="/classify/detail">
import HelloWorldVue from '@/components/HelloWorld.vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import { onMounted, onBeforeUnmount } from 'vue'
const route = useRoute()
const menuName: string = route.query.menuName as string
const type: string = route.query.type as string
const id: number = route.query.id as unknown as number
onMounted(() => {
  store.commit('switchHighlight', route.query.menuId)
  console.log(store.state.highlightid)
})
onBeforeUnmount(() => {
  //跳转离开重新加载之前取消高亮，防止其他页面错误高亮
  store.commit('switchHighlight', 0)
})
</script>
<style lang="scss" scoped></style>
