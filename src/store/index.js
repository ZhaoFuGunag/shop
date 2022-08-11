import { createStore } from 'vuex'

export default createStore({
  state: {
    token: sessionStorage.getItem("token") || "", //用户登录验证
  },
  getters: {
  },
  mutations: {
    setToken(state, v) {
      state.token = v; sessionStorage.setItem("token", v)

    }
  },
  actions: {
  },
  modules: {
  }
})
