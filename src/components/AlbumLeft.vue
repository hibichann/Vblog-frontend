<template>
  <!-- 相册页左侧部分 -->
  <div class="left">
    <AlbumItem></AlbumItem>
    <AlbumItem></AlbumItem>
    <AlbumItem></AlbumItem>
    <AlbumItem></AlbumItem>
  </div>
</template>

<script lang="ts" name="" setup>
import AlbumItem from './AlbumItem.vue'
</script>

<style lang="scss" scoped>
.left {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
