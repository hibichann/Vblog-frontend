<template>
  <el-menu
    :class="props.demo"
    v-if="defaultOpen.length"
    :default-openeds="defaultOpen"
    @close="keepopen"
    ref="menuRef"
  >
    <menu-item
      v-for="menu in menus"
      :key="menu.menuId"
      :menu="menu"
    />
  </el-menu>
</template>

<script lang="ts" name="" setup>
import { nextTick, onMounted, ref } from 'vue'
import menuItem from '@/components/MenuItem.vue'
import { getCateTree } from '@/request/api'
import { ElMenu } from 'element-plus'
// import store from '@/store'
const props = defineProps({
  demo: {
    type: String,
    default: () => {}
  }
})
const menuRef = ref<any>(null)
const keepopen = (s: any) => {
  menuRef.value.open(s)
}
let menus: any = ref(null)
const defaultOpen = ref<any>([])
onMounted(async () => {
  menus.value = await getCateTree()
  menus.value.forEach((item) => {
    defaultOpen.value.push(item.menuId)
    // TODO defaultOpen
  })
})
</script>

<style lang="scss" scoped></style>
