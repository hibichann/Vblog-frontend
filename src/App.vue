<template>
  <div>
    <layout-body-vue>
      <router-view />
      <!-- :key="routerKey" -->
    </layout-body-vue>
  </div>
</template>
<script lang="ts" setup>
import layoutBodyVue from './views/layout/layout-body.vue'
// import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import store from '@/store'
const isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}
onMounted(() => {
  store.commit('isMobile', isMobile())
})
// const route = useRoute()
// const routerKey = computed(() => {
//   //TODO query参数改变时刷新页面
//   return route.path + Math.random()
// })
</script>
<style lang="scss">
#app {
  font-family: 'HarmonyOS' !important;
  font-weight: 500 !important;
}
</style>
