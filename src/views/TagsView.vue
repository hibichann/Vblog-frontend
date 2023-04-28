<template>
  <page-frame :image="'linear-gradient(145deg, #FA9999 0%, #DDD6F3 100%)'">
    <div class="mx-3 py-5 text-lg text-white"><i class="fa fa-puzzle-piece"></i>&nbsp;{{ $t('meg.tags') }}</div>
    <div class="tags mx-5 pb-5">
      <!-- <word></word> -->
      <div class="tags">
        <span
          v-for="i in tags"
          @click="handleClick('classifyDetail', { id: i.tag_id, menuName: i.tag_name, type: 'tag' })"
          class="m-1 px-2 py-1 rounded cursor-pointer text-white"
          >{{ i.tag_name }}</span
        >
      </div>
    </div>
  </page-frame>
</template>
<script lang="ts" setup>
import { getAllTags } from '@/request/api'
import '@/request/api/types'
import router from '@/router'
import { onMounted, ref } from 'vue'
const tags = ref<allTags | null>(null)
onMounted(async () => {
  tags.value = await getAllTags()
})
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
</script>
<style lang="scss" scoped>
.tags {
  span {
    display: inline-block;
    font-size: 20px;
    color: rgb(255, 255, 255);
    box-shadow: 0 0 3px #888;
    margin: 10px;
    background: linear-gradient(to right, #df4c9f 0%, #784ba0 50%, #2b86c5 100%);
    background-size: 200%;
    transition: all ease-in 0.2s;
  }
  span:hover {
    cursor: pointer;
    box-shadow: -2px -2px 3px #888;
    background-position: 100% 0;
    transition: all ease-in 0.2s;
  }
}
</style>
