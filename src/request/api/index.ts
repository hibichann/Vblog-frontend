// 导入axios实例
import service from '@/request/index'
import './types'
//上传
export function postArticle (data) {
  return service({
    url: '/postArticle',
    method: 'post',
    data
  })
}
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
//文章获取tag
export function getTag (params:{id:number}) {
  return service({
    url: '/getTag',
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
//card4
export function getCard4 () {
  return service<any>({
    url: '/getCard4',
    method: 'get',
  })
}
//card4
export function search (params:{str:string}) {
  return service<any>({
    url: '/search',
    method: 'get',
    params
  })
}

//link
export function getLink () {
  return service<linkList>({
    url: '/getLink',
    method: 'get'
  })
}