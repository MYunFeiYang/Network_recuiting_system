import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './main.css'
import {container,header,main,footer,row,col, menu, submenu ,menuItem} from 'element-ui'

Vue.use(VueRouter);
Vue.use(container);
Vue.use(header);
Vue.use(main);
Vue.use(footer);
Vue.use(row);
Vue.use(col);
Vue.use(menu);
Vue.use(submenu);
Vue.use(menuItem);
import Login from "./component/login";

const routes = [{ path: "/login", component: Login }];
const router = new VueRouter({
  routes
});
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
