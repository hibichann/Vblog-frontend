import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import i18n from '../language/index.js'
// import { getCurrentInstance } from 'vue'
// const instance = getCurrentInstance()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: i18n.global.t('meg.home')
    }
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('../views/ClassifyView.vue'),
    meta: {
      title: i18n.global.t('meg.category')
    }
  },
  {
    path: '/classify/detail',
    name: 'classifyDetail',
    component: () => import('../views/ClassifyDetail.vue'),
    meta: {
      title: i18n.global.t('meg.CateDetail')
    }
  },
  {
    path: '/article/detail',
    name: 'articleDetail',
    component: () => import('../views/ArticleDetail.vue'),
    meta: {
      title: i18n.global.t('meg.CateDetail')
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/testTest.vue'),
    meta: {
      title: i18n.global.t('meg.test')
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('../views/TagsView.vue'),
    meta: {
      title: i18n.global.t('meg.tags')
    }
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('../views/AlbumView.vue'),
    meta: {
      title: i18n.global.t('meg.album')
    }
  },
  {
    path: '/album/detail',
    name: 'albumDetail',
    component: () => import('../views/AlbumDetail.vue'),
    meta: {
      title: i18n.global.t('meg.album')
    }
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes
})
router.afterEach((to, from) => {
  document.title = ((i18n.global.locale.value === 'zh') ? 'Hibi 博客站' : 'Hibi Blog') + '-' + to.meta.title
})
export default router
