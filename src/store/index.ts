import { createStore } from 'vuex'

export default createStore({
  state: {
    // language: 'zh'
    highlightid:0,
    isMobile:0
  },
  getters: {
  },
  mutations: {
    // switchLanguage (state) {
    //   if (state.language === 'zh')state.language = 'en'
    //   else state.language = 'zh'
    // }
    switchHighlight(state,id){
      state.highlightid=id
    },
    isMobile(state,flag){
      state.isMobile=flag
    }
  },
  actions: {
  },
  modules: {
  }
})
