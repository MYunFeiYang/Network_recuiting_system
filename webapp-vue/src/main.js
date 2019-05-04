import Vue from 'vue'
import router from './router'
import store from './vuex'
import App from './App.vue'
import './main.css'
import './element'



new Vue({
  el: '#app',
  render: h => h(App),
  components: {

  },
  router,
  store
})
