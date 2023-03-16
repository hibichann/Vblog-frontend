<template>
  <!-- 分类页面 -->
  <div class="classify">
    <el-row>
      <el-col :span="spanWidth[0]"></el-col>
      <el-col :span="spanWidth[1]">
        <div class="left-body">
          <div class="left">
            <div class="mx-5 py-5 text-lg"><i class="fa fa-puzzle-piece"></i>&nbsp;{{ $t('meg.tags') }}</div>
            <div class="tags mx-5 pb-5">
              <word :arr="tagsArr"></word>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="spanWidth[2]"></el-col>
      <el-col :span="spanWidth[3]">
        <div class="right-body">
          <div class="card-content"><PlainCardVue></PlainCardVue></div></div
      ></el-col>
      <el-col :span="spanWidth[4]"></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import PlainCardVue from '@/components/PlainCard.vue'
import { ElRow, ElCol } from 'element-plus'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
import { getAllTags } from '@/request/api'
import '@/request/api/types'
import word from '@/components/word.vue'
const spanWidth = ref([2, 13, 1, 6, 2])
const checkWidth = () => {
  if (store.state.isMobile) {
    spanWidth.value[0] = 1
    spanWidth.value[1] = 22
    spanWidth.value[2] = 0
    spanWidth.value[3] = 0
    spanWidth.value[4] = 1
  } else {
    spanWidth.value[0] = 2
    spanWidth.value[1] = 13
    spanWidth.value[2] = 1
    spanWidth.value[3] = 6
    spanWidth.value[4] = 2
  }
}

const tagsArr = ref<allTags>([])
onMounted(async () => {
  checkWidth()
  tagsArr.value = await getAllTags()
})
onBeforeUnmount(() => {})
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
.left-body {
  background-color: white;
  margin: 50px 0;
  border-radius: 10px;
  padding: 30px 50px;
  // backdrop-filter: blur(5px) brightness(40%);
}
.left {
  width: 100%;
  height: 100%;
  background-color: #fff;
  min-height: 50px;
  border-radius: 10px;
}

.right-body {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  text-align: left;
}
</style>
