import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import i18n from '../language/index.js'
// import { getCurrentInstance } from 'vue'
// const instance = getCurrentInstance()
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
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
    path: '/archive',
    name: 'archive',
    component: () => import('../views/Archive.vue'),
    meta: {
      title: i18n.global.t('meg.archive')
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
      title: i18n.global.t('meg.ArtDetail')
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
    path: '/corner',
    name: 'corner',
    component: () => import('../views/Corner.vue'),
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
  routes,
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { top:0,behavior: 'smooth', }
	},
})
router.afterEach((to, from) => {
  document.title = ((i18n.global.locale.value === 'zh') ? 'Hibi 博客站' : 'Hibi Blog') + '-' + to.meta.title
})
export default router
