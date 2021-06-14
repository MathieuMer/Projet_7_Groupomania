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
    userFirstname: '',
    userLastname: '',
    userAvatar: '',
    userBirthdate: '',
    userBio: '',
    messages: [],
    renderKey: 1
  },

  getters: {
    isAuthenticated: state => !!state.token,
  },

  mutations: {
    SET_USER_ID(state, data) {
      state.userId = data.userId
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, data) {
      state.status = 'success: user logged'
      state.userId = data.userId
      state.userFirstname = data.firstname
      state.userLastname = data.lastname
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
    SET_USERINFO_SUCCESS(state, data) {
      state.status = 'success: got users infos'
      state.userFirstname = data.user.firstname
      state.userLastname = data.user.lastname
      state.userAvatar = data.user.avatar
      state.userBirthdate = data.user.birthdate
      state.userBio = data.user.bio
      state.userJob = data.user.job
    },
    SET_USERINFO_ERROR(state)  {
      state.status = 'error'
    },
    UPDATE_ACCOUNT_REQUEST(state) {
      state.status = 'loading'
    },
    UPDATE_ACCOUNT_SUCCESS(state) {
      state.status = 'success: user profil updated'
    },
    UPDATE_ACCOUNT_ERROR(state) {
      state.status = 'error'
    },
    NEW_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    NEW_COMMENT_SUCCESS(state) {
      state.status = 'success: comment sent'
    },
    NEW_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    DELETE_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    DELETE_COMMENT_SUCCESS(state) {
      state.status = 'success: comment deleted'
    },
    DELETE_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    EDIT_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    EDIT_COMMENT_SUCCESS(state) {
      state.status = 'success: comment modified'
    },
    EDIT_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    NEW_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    NEW_MESSAGE_SUCCESS(state) {
      state.status = 'success: message sent'
    },
    NEW_MESSAGE_ERROR(state) {
      state.status = 'error'
    },
    DELETE_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    DELETE_MESSAGE_SUCCESS(state) {
      state.status = 'success: comment deleted'
    },
    DELETE_MESSAGE_ERROR(state) {
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
          commit('AUTH_SUCCESS', resp.data);
          const token = resp.data.token;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },

    getMessages: ({commit}, userId) => {
      return new Promise((resolve, reject) => {
        commit('SET_MESSAGES_REQUEST')
        axios({url: 'http://localhost:3000/api/message/', method: 'GET' })
        .then(resp => {
          console.log(resp);
          if (userId == -1) {
            commit('SET_USER_ID', resp.data.pop())
          } else {
            resp.data.pop()
          }
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
        localStorage.removeItem('userId')
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
    getUserInfos: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO_REQUEST')
        axios({url: 'http://localhost:3000/api/user/me', method: 'GET' })
        .then(resp => {
          console.log(resp);
          commit('SET_USERINFO_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_USERINFO_ERROR')
          console.log(err)
          reject(err)
        })
      })
    },
    updateProfil: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('UPDATE_ACCOUNT_REQUEST')
        const FormData = require('form-data');
        let form = new FormData();
        if (data.bio !== null && data.bio !== undefined) {
          form.append('bio', data.bio);
        }
        if (data.birthdate !== null && data.bio !== undefined) {
          form.append('birthdate', data.birthdate);
        }
        if (data.image !== null && data.image !== undefined) {
          form.append('image', data.image);
        }
        axios.put('http://localhost:3000/api/user/me', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp => {
          console.log(resp);
          commit('UPDATE_ACCOUNT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('UPDATE_ACCOUNT_ERROR')
          reject(err)
        })
      })
    },
    submitComment: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('NEW_COMMENT_REQUEST')
        axios({url: 'http://localhost:3000/api/comment', data: data, method: 'POST' })
        .then(resp => {
          console.log(resp);
          commit('NEW_COMMENT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('NEW_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    deleteComment: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('DELETE_COMMENT_REQUEST')
        axios({url: 'http://localhost:3000/api/comment', data: data, method: 'DELETE' })
        .then(resp => {
          console.log(resp);
          commit('DELETE_COMMENT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    editComment: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('EDIT_COMMENT_REQUEST')
        axios({url: 'http://localhost:3000/api/comment', data: data, method: 'PUT' })
        .then(resp => {
          console.log(resp);
          commit('EDIT_COMMENT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('EDIT_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    postNewMessage: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('NEW_MESSAGE_REQUEST')
        const FormData = require('form-data');
        let form = new FormData();
        if (data.content !== null && data.content !== undefined) {
          form.append('content', data.content);
        }
        if (data.image !== null && data.image !== undefined) {
          form.append('image', data.image);
        }
        axios.post('http://localhost:3000/api/message', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp => {
          console.log(resp);
          commit('NEW_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('NEW_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    deleteMessage: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('DELETE_MESSAGE_REQUEST')
        axios({url: 'http://localhost:3000/api/message', data: data, method: 'DELETE' })
        .then(resp => {
          console.log(resp);
          commit('DELETE_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_MESSAGE_ERROR')
          reject(err)
        })
      })
    },

  }
});


