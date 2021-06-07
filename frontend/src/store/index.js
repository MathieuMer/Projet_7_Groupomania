import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex)
Vue.config.devtools = true;

export default new Vuex.Store({

  state: {
    status: '',
    userId: -1,
    token: localStorage.getItem('token') || '',
    userLogged: false,
    userFirstname: '',
    userLastname: '',
    userAvatar: '',
    userBirthdate: '',
    messages: []
  },

  getters: {
    isAuthenticated: state => !!state.token,
    isLogged: state => state.userLogged
  },

  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, data) {
      state.status = 'success: user logged'
      state.userId = data.userId
      state.userFirstname = data.firstname
      state.userLastname = data.lastname
      state.userLogged = true
      state.token = data.token
      state.userBirthdate = data.birthdate
      state.userAvatar = data.avatar
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    LOGOUT(state) {
      state.status = 'success: logged out'
      state.userId = -1
      state.userLogged = false
      state.token = ''
      state.userFirstname = ''
      state.userLastname = ''
      state.messages = []
    },
    SET_MESSAGES_REQUEST(state) {
      state.status = 'loading'
    },
    SET_MESSAGES_SUCCESS(state, messages) {
      state.messages = messages
      state.status = 'success: messages received'
    },
    SET_MESSAGE_ERROR(state)  {
      state.status = 'error'
    },
    CREATE_ACCOUNT_REQUEST(state) {
      state.status = 'loading'
    },
    CREATE_ACCOUNT_SUCCESS(state) {
      state.status = 'success: user created'
    },
    SET_USERINFO_REQUEST(state) {
      state.status = 'loading'
    },
    SET_USERINFO(state, storage) {
      state.status = 'success: got users infos'
      state.userId = storage.userId
      state.userLogged = true
      state.userFirstname = storage.firstname
      state.userLastname = storage.lastname
      state.userAvatar = storage.avatar
      state.userBirthdate = storage.birthdate
    },
    SET_USERINFO_ERROR(state)  {
      state.status = 'error'
    },
  },

  actions : {
    login: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/user/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          const token = resp.data.token;
          localStorage.setItem('token', JSON.stringify(token));
          //const token = localStorage.getItem('token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('AUTH_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    getMessages: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit('SET_MESSAGES_REQUEST')
        axios({url: 'http://localhost:3000/api/message/', method: 'GET' })
        .then(resp => {
          console.log(resp);
          commit('SET_MESSAGES_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_MESSAGE_ERROR')
          console.log(err)
          reject(err)
        })
      })
    },

    logout({commit}){
      return new Promise((resolve) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    signup: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('CREATE_ACCOUNT_REQUEST')
        axios({url: 'http://localhost:3000/api/user/signup', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          commit('CREATE_ACCOUNT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    getUserInfos: ({commit}, storage) => {
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO_REQUEST')
        .then(resp => {
          commit('SET_USERINFO', storage);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_USERINFO_ERROR')
          console.log(err)
          reject(err)
        })
      })
    },
  }
});


