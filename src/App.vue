<template>
  <div>
    <layout-body-vue>
      <router-view v-slot="{ Component }">
        <transition
          name="slide-fade"
          appear
        >
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </layout-body-vue>
  </div>
</template>
<script lang="ts" setup>
import layoutBodyVue from './views/layout/layout-body.vue'
import { onMounted, ref } from 'vue'
import store from '@/store'
const isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}
let a = ref(true)
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
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
