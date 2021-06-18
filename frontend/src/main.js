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
const tokenInLocalstorage = localStorage.getItem('token');
if (tokenInLocalstorage) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokenInLocalstorage}`
}

// // Filtre global capitalize
// Vue.filter('capitalize', function (value) {
//   if (!value) return ''
//   value = value.toString().toLowerCase()
//   return `${value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}`
// })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
