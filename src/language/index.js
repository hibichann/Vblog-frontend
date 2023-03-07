import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
const i18n = createI18n({
    legacy: false,
    locale: 'zh', // 语言标识（缓存里面没有就用中文）
    messages: {
        zh,
        en
    }
})
if (window.localStorage.getItem('lang') !== 'zh' && window.localStorage.getItem('lang') !== 'en') {
    window.localStorage.setItem('lang', 'zh')
}
i18n.global.locale.value = window.localStorage.getItem('lang')
export default i18n