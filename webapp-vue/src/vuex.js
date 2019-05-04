import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: '',
    },
    mutations: {
        setUserInformation(state, payload) {
            state.user = payload
        }
    },
    actions: {
        setUserInformation (context,payload) {
          context.commit('setUserInformation',payload)
        }
      }
})

export default store;