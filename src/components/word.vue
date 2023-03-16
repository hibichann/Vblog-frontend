<template>
  <div>
    <!-- <span
      :style="{ color: colorRandom(), fontSize: sizeRandom() }"
      v-for="i in props.arr"
      :key="i.tag_id"
      @click="handleClick('classifyDetail', { id: i.tag_id, menuName: i.tag_name, type: 'tag' })"
      >{{ i.tag_name }}</span
    > -->
  </div>
</template>

<script lang="ts" name="" setup>
import router from '@/router'
const props = defineProps()
const colorArr = ['coral', 'darkcyan', 'chocolate', 'brown', 'deeppink', 'limegreen', 'orange']
const fontSize = ['14px', '18px', '22px', '26px']
const colorRandom = () => colorArr[Math.floor(Math.random() * colorArr.length)]
const sizeRandom = () => fontSize[Math.floor(Math.random() * fontSize.length)]
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
</script>

<style lang="scss" scoped></style>
