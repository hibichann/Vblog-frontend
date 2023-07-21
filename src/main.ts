import { createApp } from 'vue'
import Card from './components/CardMD.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//tools
import 'element-plus/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './language/index.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import 'github-markdown-css/github-markdown-light.css'
//css
import './assets/css/reset.css'
import './assets/css/scroll.css'
import './assets/css/font.css'
import './assets/css/el.css'
import './index.css'
import 'animate.css'
//md editer
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import PageFrame from './components/PageFrame.vue'
VMdEditor.use(githubTheme, {
  Hljs: hljs
})
createApp(App)
  .component('PageFrame', PageFrame)
  .use(VMdEditor)
  .use(store)
  .use(router)
  .use(i18n)
  .provide('$axios', axios)
  .component('Card', Card)
  .directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
  // .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
// App
