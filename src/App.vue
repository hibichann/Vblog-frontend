<template>
  <div>
    <layout-body-vue>
      <transition name="slide-fade">
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            :key="route.fullPath"
          ></component>
        </router-view>
      </transition>
    </layout-body-vue>
  </div>
</template>
<script lang="ts" setup>
import layoutBodyVue from './views/layout/layout-body.vue'
import { onMounted } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'
const route = useRoute()
const isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}
onMounted(() => {
  store.commit('isMobile', isMobile())
})
</script>
<style lang="scss">
#app {
  font-family: 'HarmonyOS' !important;
  font-weight: 500 !important;
}
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

// .slide-fade-leave-active {
//   // transition: all 0 cubic-bezier(1, 0.5, 0.8, 1);
// }
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
