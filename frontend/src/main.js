import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';

Vue.config.productionTip = false

//Réactive le header Authorization
const storage = JSON.parse(localStorage.getItem('token'));
if (storage) {
  console.log(storage.token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${storage.token}`
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
