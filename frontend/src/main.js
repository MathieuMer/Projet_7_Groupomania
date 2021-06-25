import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios';
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './assets/.env'});

//Vérification de la présence d'un token
const token = localStorage.getItem('token');
if (token) {
  // Remet le header Authorization par défaut
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // Remet l'id et isAdmin dans le store
  const decodedToken = jwt.decode(token);
  const data = {
    userId: decodedToken.userId,
    isAdmin: decodedToken.isAdmin
  }
  store.dispatch("setUserId", data);
}


Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
