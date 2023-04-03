import { createI18n } from 'vue-i18n'
import cn from './cn'
import en from './en'
const i18n = createI18n({
  legacy: false,
  locale: 'en', // 语言标识（缓存里面没有就用中文）
  messages: {
    cn,
    en
  }
})
if (window.localStorage.getItem('lang') !== 'cn' && window.localStorage.getItem('lang') !== 'en') {
  window.localStorage.setItem('lang', 'en')
}
i18n.global.locale.value = window.localStorage.getItem('lang')
export default i18n
