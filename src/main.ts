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
import "highlight.js/styles/a11y-dark.css";
import "github-markdown-css/github-markdown-light.css"

import './assets/css/reset.css'
import './assets/css/scroll.css'
import './assets/css/font.css'
import './assets/css/el.css'
import './index.css'
// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
// library.add(faUserSecret)
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
