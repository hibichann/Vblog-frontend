// 导入axios实例
import service from '@/request/index'
import './types'

//归档
export function getArchive () {
  return service({
    url: '/getArchive',
    method: 'get'
  })
}
//分页文章列表
export function getBlogByPage (params: blogByPage) {
  return service({
    url: '/getBlogByPage',
    method: 'get',
    params
  })
}
//分页文章列表tag
export function getBlogByTag (params: blogByTag) {
  return service({
    url: '/getBlogByTag',
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
//获取全部tag
export function getAllTags () {
  return service<allTags>({
    url: '/getAllTags',
    method: 'get',
  })
}
//card1
export function getCard1 () {
  return service<card1>({
    url: '/getCard1',
    method: 'get',
  })
}
