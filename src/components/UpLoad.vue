<template>
  <div v-loading="listLoading">
    <el-upload v-if="props.isUpload" class="upload-demo" action="" :http-request="handleUpload" :show-file-list="false" :disabled="props.isDisabled">
      <el-button type="primary" :disabled="props.isDisabled"> 附件上传 </el-button>
    </el-upload>
    <ul v-for="(item, index) in props.fileListData" :key="item.fileId" class="flex flex-row flex-justify-content-between flex-align-items-center">
      <li>
        <a :href="item.fileUrl" :download="item.fileName">
          <el-icon><Document /></el-icon> {{ item.fileName }}
        </a>
      </li>
      <li v-if="props.isUpload">
        <el-icon :class="[props.isDisabled ? 'nodele' : 'dele']" @click="del(item, index)">
          <Close />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { annexUploadFlie, delAnnexFlie } from '@/api/fileUpload'
import type { IFile } from '@/api/types/fileUpload'

const props = defineProps({
  fileListData: {
    type: Array as PropType<IFile[]>,
    default: () => []
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isUpload: {
    type: Boolean,
    default: true
  }
})
watch(
  () => props.fileListData,
  (val) => {
    if (val.length > 0 && fileIdList.value.length === 0) {
      const arr: string[] = []
      val.forEach((item) => {
        arr.push(item.fileId)
      })
      fileIdList.value = arr
      fileList.value = JSON.parse(JSON.stringify(props.fileListData))
      emit('update:fileIdList', fileIdList.value)
    }
  },
  {
    deep: true
  }
)
const fileList = ref<IFile[]>([])
const fileIdList = ref<string[]>([])
const emit = defineEmits(['update:list', 'update:fileIdList'])
const handleUpload = async ({ file }: { file: File }) => {
  listLoading.value = true
  const data = await annexUploadFlie({
    file
  }).finally(() => {
    listLoading.value = false
  })
  fileList.value.push(data)
  const arr: string[] = []
  fileList.value.forEach((item) => {
    arr.push(item.fileId)
  })
  fileIdList.value = arr
  emit('update:fileIdList', fileIdList.value)
  emit('update:list', fileList.value)
  ElMessage.success('上传成功')
}

const listLoading = ref(false)
const del = async (row: IFile, index: number) => {
  if (props.isDisabled) return
  ElMessageBox.confirm('确定要删除该文件？', '操作提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      listLoading.value = true
      await delAnnexFlie(row.fileId)
        .then(() => {
          ElMessage.success('删除成功')
          fileList.value.splice(index, 1)
          const arr: string[] = []
          fileList.value.forEach((item) => {
            arr.push(item.fileId)
          })
          fileIdList.value = arr
          emit('update:fileIdList', fileIdList.value)
          emit('update:list', fileList.value)
        })
        .finally(() => {
          listLoading.value = false
        })
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.dele:hover {
  cursor: pointer;
  color: red;
}
.nodele:hover {
  color: #333;
  cursor: not-allowed;
}
</style>
