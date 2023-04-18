<template>
  <div class="p-20 w-full"></div>
  <div class="flex">
    <div class="flex-1">
      <div class="my-2">语言/language</div>
      <el-select v-model="lang">
        <el-option
          label="中文"
          value="cn"
        ></el-option>
        <el-option
          label="英语"
          value="en"
        ></el-option>
      </el-select>
    </div>
    <div class="flex-1">
      <div class="my-2">分类/categories</div>
      <el-cascader
        v-model="cate"
        :options="cates"
        :props="{ label: 'menuName', value: 'menuId', children: 'children' }"
      />
    </div>
    <div class="flex-1">
      <div class="my-2">标签/tags</div>
      <el-check-tag
        class="m-1"
        v-for="(i, index) in tags"
        :value="i.tag_id"
        :checked="tags[index]['checked']"
        @click="click1(i.tag_id, index)"
        >{{ i.tag_name }}</el-check-tag
      >
    </div>
  </div>
  <div class="">
    <div class="my-2">标题/title</div>
    <el-input v-model="title"></el-input>
  </div>
  <div class="">
    <div class="my-2">正文/article</div>
    <v-md-editor
      v-model="content"
      height="400px"
    ></v-md-editor>
  </div>
  <div class="p-5 flex">
    <el-button
      style="margin: 0 auto"
      type="primary"
      round
      @click="commit"
      >提交/commit</el-button
    >
  </div>
</template>

<script lang="ts" name="" setup>
import { getCateTree, getAllTags, postArticle } from '@/request/api'
import '@/request/api/types'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
const content = ref('')
const title = ref('')
const cates = ref([])
const tags = ref<allTags>([])
const cate = ref([])
const lang = ref('')
let tagarr: any = []
const click1 = (v, index) => {
  if (!tags.value[index]['checked']) tagarr.push(v)
  else tagarr = tagarr.filter((i) => i !== v)
  tags.value[index]['checked'] = !tags.value[index]['checked']
}
const commit = async () => {
  if (!(title.value && lang.value && cate.value && content.value)) {
    ElMessage.warning('请完成所有项/Please finish article')
    return
  }
  await postArticle({
    title: title.value,
    lang: lang.value,
    cate: cate.value[cate.value.length - 1],
    content: content.value,
    tagarr: tagarr
  })
}
onMounted(async () => {
  cates.value = await getCateTree()
  tags.value = await getAllTags()
})
</script>

<style lang="scss" scoped></style>
