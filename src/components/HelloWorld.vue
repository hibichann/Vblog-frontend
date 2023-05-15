<template>
  <page-frame :color="'transparent'">
    <div
      class="title"
      v-if="title"
    >
      {{ '&nbsp;&nbsp;&nbsp;' + title }}
    </div>
    <div v-if="list.content !== undefined">
      <CardMDVue
        v-for="(i, index) in list.content"
        :article="i"
        :key="i"
        :reverse="index"
      ></CardMDVue>
    </div>
    <div class="text-center">
      <div
        class="transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer hover:text-lg hover:leading-6"
        v-if="props.type === 'home'"
        @click="handleClick('archive')"
      >
        {{ $t('meg.seemore') }}
      </div>
      <div
        v-else
        class="flex justify-between"
      >
        <div
          v-show="page !== 1"
          @click="handleClick2('up')"
          class="flex-1 transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer"
        >
          {{ $t('meg.up') }}
        </div>
        <div
          class="flex-1"
          v-show="page === 1"
        ></div>
        <div
          v-show="list.total - page * 10 > 0"
          @click="handleClick2('down')"
          class="flex-1 transition-all text-white text-base h-20px leading-6 text-center px-2 py-1 m-10 border-solid border-2 inline-block cursor-pointer"
        >
          {{ $t('meg.down') }}
        </div>
      </div>
    </div></page-frame
  >
</template>

<script lang="ts" name="" setup>
import { onMounted, ref } from 'vue'
import CardMDVue from './CardMD.vue'
import '@/request/api/types'
import { getBlogByPage, getBlogByTag, getIndex } from '@/request/api'
import router from '@/router'
const props = defineProps({
  type: {
    type: String,
    default: 'home',
    required: false
  },
  id: {
    type: Number,
    default: 1,
    required: false
  },
  title: {
    type: String,
    default: '',
    required: false
  }
})
const title = ref<string>('')
const page = ref(1)
const list = ref<any>({})
const handleList = async (page) => {
  if (props.type === 'cate') {
    list.value = await getBlogByPage({ page, classid: props.id })
  } else if (props.type === 'tag') {
    list.value = await getBlogByTag({ page, tagid: props.id })
  } else {
    list.value = await getIndex()
  }
}
const handleClick = (name, query?) => {
  router.push({
    name,
    query
  })
}
const handleClick2 = (text) => {
  if (text === 'down') {
    page.value += 1
    handleList(page.value)
  } else if (text === 'up') {
    page.value -= 1
    handleList(page.value)
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
onMounted(() => {
  title.value = props.title
  handleList(page.value)
})
</script>

<style lang="scss" scoped>
.title {
  width: 30%;
  color: rgb(255, 255, 255);
  display: inline-block;
  background-color: #fbda61;
  background-image: linear-gradient(60deg, #ff5acd 0%, #fbda61 100%);
  font-size: 18px;
  line-height: 45px;
  border-radius: 10px;
}
</style>
