// 导入axios实例
import service from '@/request/index'
import './types'

//分页文章列表
export function getBlogByPage (params: blogByPage) {
  return service({
    url: '/getBlogByPage',
    method: 'get',
    params
  })
}
//分类列表
export function getCateTree () {
  return service({
    url: '/getCateTree',
    method: 'get'
  })
}
//文章详情
export function getArticle (params:{id:number}) {
  return service({
    url: '/getArticle',
    method: 'get',
    params
  })
}