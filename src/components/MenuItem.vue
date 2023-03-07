<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length"
    :index="menu.menuId"
  >
    <template #title>
      <span>{{ menu.menuName }}</span>
    </template>
    <menu-item
      v-for="subMenu in menu.children"
      :key="subMenu.menuId"
      :menu="subMenu"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :class="store.state.highlightid === menu.menuId ? 'highlight' : '1'"
    :index="menu.menuId"
    @click="clickTitle(menu.menuId, menu.menuName)"
  >
    <template #title>
      <span>{{ menu.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
const props = defineProps({
  menu: {
    type: Object as PropType<any>,
    required: true,
    default: {}
  }
})

const router = useRouter()
const clickTitle = (menuId: number, menuName: string) => {
  router.push({ name: 'classifyDetail', query: { menuId: menuId, menuName: menuName } })
}
const menu = ref(props.menu)
</script>

<style lang="scss" scoped>
.highlight {
  color: rgb(129, 54, 24) !important;
}
</style>
