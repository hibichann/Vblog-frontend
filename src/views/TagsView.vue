<template>
  <page-frame :color="'white'">
    <div class="mx-3 py-5 text-lg"><i class="fa fa-puzzle-piece"></i>&nbsp;{{ $t('meg.tags') }}</div>
    <div class="tags mx-5 pb-5">
      <word></word>
    </div>
  </page-frame>
</template>
<script lang="ts" setup>
import word from '@/components/word.vue'
</script>
<style lang="scss" scoped>
.tags {
  .active {
    background-color: #cfcfcf;
    border-radius: 10px;
  }
  span {
    color: rgb(48, 48, 48);
    display: inline-block;
    margin: 4px;
    padding: 8px;
    font-weight: bolder;
  }
  span:hover {
    color: rgb(148, 148, 148);
    cursor: pointer;
  }
}
.classify {
  background-image: url('../../public/img/bg0.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
