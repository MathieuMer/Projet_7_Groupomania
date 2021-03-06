import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// Creation de l'instance d'axios :
const defaultOptions = {
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};

let server = axios.create(defaultOptions);

// Intercepteur qui ajoute le header Authorization sur toutes les requetes
server.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

Vue.use(Vuex)
Vue.config.devtools = true;

export default new Vuex.Store({

  state: {
    status: '',
    userId: -1,
    isAdmin: false,
    token: localStorage.getItem('token') || '',
    userFirstname: '',
    userLastname: '',
    userAvatar: '',
    userBirthdate: '',
    userBio: '',
    messages: [],
    renderKey: 1,
    signaledMessage: [],
    signaledComment: [],
    otherUserProfile: ''
  },

  getters: {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.isAdmin
  },

  mutations: {
    SET_USER_INFO(state, data) {
      state.userId = data.userId
      state.isAdmin = data.isAdmin
    },
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, data) {
      state.status = 'success: user logged'
      state.userId = data.userId
      state.isAdmin = data.isAdmin
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
      state.status = 'error: can not create new message'
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
    DELETE_USER_REQUEST(state) {
      state.status = 'loading'
    },
    DELETE_USER_SUCCESS(state) {
      state.status = 'success: user deleted'
    },
    DELETE_USER_ERROR(state) {
      state.status = 'error'
    },
    SIGNAL_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    SIGNAL_MESSAGE_SUCCESS(state) {
      state.status = 'success: message signaled'
    },
    SIGNAL_MESSAGE_ERROR(state) {
      state.status = 'error'
    },
    SIGNAL_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    SIGNAL_COMMENT_SUCCESS(state) {
      state.status = 'success: comment signaled'
    },
    SIGNAL_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    GETSIGNALED_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    GETSIGNALED_COMMENT_SUCCESS(state, data) {
      state.status = 'success: signaled comments received'
      state.signaledComment = data
    },
    GETSIGNALED_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    GETSIGNALED_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    GETSIGNALED_MESSAGE_SUCCESS(state, data) {
      state.status = 'success: signaled messages received'
      state.signaledMessage = data
    },
    GETSIGNALED_MESSAGE_ERROR(state) {
      state.status = 'error'
    },
    DELETESIGNAL_COMMENT_REQUEST(state) {
      state.status = 'loading'
    },
    DELETESIGNAL_COMMENT_SUCCESS(state) {
      state.status = 'success: comment signal deleted'
    },
    DELETESIGNAL_COMMENT_ERROR(state) {
      state.status = 'error'
    },
    DELETESIGNAL_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    DELETESIGNAL_MESSAGE_SUCCESS(state) {
      state.status = 'success: message signal deleted'
    },
    DELETESIGNAL_MESSAGE_ERROR(state) {
      state.status = 'error'
    },
    GET_OTHERUSERINFO_REQUEST(state) {
      state.status = 'loading'
    },
    GET_OTHERUSERINFO_SUCCESS(state, data) {
      state.status = 'success: user:id profile received'
      state.otherUserProfile = data.data
    },
    GET_OTHERUSERINFO_ERROR(state) {
      state.status = 'error'
    },
    EDIT_MESSAGE_REQUEST(state) {
      state.status = 'loading'
    },
    EDIT_MESSAGE_SUCCESS(state) {
      state.status = 'success: message modified'
    },
    EDIT_MESSAGE_ERROR(state) {
      state.status = 'error'
    },

  },

  actions : {
    login: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        server({url: 'user/login', data: user, method: 'POST' })
        .then(resp => {
          commit('AUTH_SUCCESS', resp.data);
          const token = resp.data.token;
          localStorage.setItem('token', token);
          server.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
        server({url: 'message/', method: 'GET' })
        .then(resp => {
          commit('SET_MESSAGES_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_MESSAGE_ERROR')
          reject(err)
        })
      })
    },

    logout({commit}){
      return new Promise((resolve) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete server.defaults.headers.common['Authorization']
        resolve()
      })
    },

    signup: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('CREATE_ACCOUNT_REQUEST')
        server({url: 'user/signup', data: user, method: 'POST' })
        .then(resp => {
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
    getUserInfos: ({commit}) => { // Page Me (pour voir et modifier son profil)
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO_REQUEST')
        server({url: 'user/me', method: 'GET' })
        .then(resp => {
          commit('SET_USERINFO_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_USERINFO_ERROR')
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
        if (data.birthdate !== null && data.birthdate !== undefined) {
          form.append('birthdate', data.birthdate);
        }
        if (data.image !== null && data.image !== undefined) {
          form.append('image', data.image);
        }
        server.put('user/me', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp => {
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
        server({url: 'comment', data: data, method: 'POST' })
        .then(resp => {
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
        server({url: 'comment', data: data, method: 'DELETE' })
        .then(resp => {
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
        server({url: 'comment', data: data, method: 'PUT' })
        .then(resp => {
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
        server.post('message', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp => {
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
        server({url: 'message', data: data, method: 'DELETE' })
        .then(resp => {
          commit('DELETE_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    deleteUser: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('DELETE_USER_REQUEST')
        server({url: 'user/me', data: data, method: 'DELETE' })
        .then(resp => {
          commit('DELETE_USER_SUCCESS')
          commit('LOGOUT')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETE_USER_ERROR')
          reject(err)
        })
      })
    },
    signalMessage: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('SIGNAL_MESSAGE_REQUEST')
        server({url: 'message/signal', data: data, method: 'PUT' })
        .then(resp => {
          commit('SIGNAL_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('SIGNAL_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    signalComment: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('SIGNAL_COMMENT_REQUEST')
        server({url: 'comment/signal', data: data, method: 'PUT' })
        .then(resp => {
          commit('SIGNAL_COMMENT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('SIGNAL_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    getSignaledComment: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit('GETSIGNALED_COMMENT_REQUEST')
        server({url: 'comment/signal', method: 'GET' })
        .then(resp => {
          commit('GETSIGNALED_COMMENT_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('GETSIGNALED_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    getSignaledMessage: ({commit}) => {
      return new Promise((resolve, reject) => {
        commit('GETSIGNALED_MESSAGE_REQUEST')
        server({url: 'message/signal', method: 'GET' })
        .then(resp => {
          commit('GETSIGNALED_MESSAGE_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('GETSIGNALED_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    deleteSignalComment: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('DELETESIGNAL_COMMENT_REQUEST')
        server({url: 'comment/deletesignal', data: data, method: 'PUT' })
        .then(resp => {
          commit('DELETESIGNAL_COMMENT_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETESIGNAL_COMMENT_ERROR')
          reject(err)
        })
      })
    },
    deleteSignalMessage: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('DELETESIGNAL_MESSAGE_REQUEST')
        server({url: 'message/deletesignal', data: data, method: 'PUT' })
        .then(resp => {
          commit('DELETESIGNAL_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('DELETESIGNAL_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    getUserProfil: ({commit}, id) => { // Page User (pour voir le profil d'un autre utilisateur)
      return new Promise((resolve, reject) => {
        commit('GET_OTHERUSERINFO_REQUEST')
        server({url: `user/${id}`, method: 'GET' })
        .then(resp => {
          commit('GET_OTHERUSERINFO_SUCCESS', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('GET_OTHERUSERINFO_ERROR')
          reject(err)
        })
      })
    },
    editMessage: ({commit}, data) => {
      return new Promise((resolve, reject) => {
        commit('EDIT_MESSAGE_REQUEST')
        const FormData = require('form-data');
        let form = new FormData();
        form.append('messageId', data.messageId);
        form.append('content', data.content);
        if (data.file !== null && data.file !== undefined) {
          form.append('image', data.file);
        }
        if (data.deleteOld) {
          form.append('deleteOld', data.deleteOld);
        }
        server.put('message', form, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(resp => {
          commit('EDIT_MESSAGE_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('EDIT_MESSAGE_ERROR')
          reject(err)
        })
      })
    },
    setUserId({commit}, data){
      return new Promise((resolve) => {
        commit('SET_USER_INFO', data);
        resolve()
      })
    },

  }
});


