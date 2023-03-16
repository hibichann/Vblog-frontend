import { createApp } from 'vue'
import Card from './components/CardMD.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './language/index.js'
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import "github-markdown-css/github-markdown-light.css"
// import * as echarts from 'echarts'
// import 'echarts-wordcloud'

import './assets/css/reset.css'
import './assets/css/scroll.css'
import './assets/css/font.css'
import './assets/css/el.css'
import './index.css'
createApp(App)
.use(store)
.use(router)
.use(i18n)
.use(ElementPlus)
.provide('$axios', axios)
.component('Card', Card)
.directive("highlight",function(el){
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block)=>{
      hljs.highlightBlock(block);
  })
})
// .component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
// App
