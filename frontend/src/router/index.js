import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Home from '../views/Home.vue';
import Me from '../views/Me.vue';
import User from '../views/User.vue';
import Admin from '../views/Admin.vue';
import store from '../store';

Vue.use(VueRouter)

// Lorsqu'un user arrive sur une URL du site,si User est déjà authentifié alors redirection vers Home
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/Home')
}

// Si User pas authentifié alors redirection vers page login
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    console.log(store.getters.isAuthenticated)
    next()
    return
  }
  next('/')
}





const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: ifAuthenticated
  },

  { path: '', component: Login },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Scroll tout en haut de la page lors d'un changement de page
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next();
})

export default router
