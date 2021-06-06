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
    messages: []
  },

  getters: {

  },

  mutations: {
    AUTH_REQUEST(state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS(state, data) {
      state.status = 'success'
      state.userId = data.userId
    },
    AUTH_ERROR(state) {
      state.status = 'error'
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages
    },
    SET_MESSAGE_ERROR(state)  {
      state.status = 'error'
    }
  },

  actions : {
    login: ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({url: 'http://localhost:3000/api/user/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          const token = resp.data.token;
          localStorage.setItem('token', token);
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
        const token = localStorage. getItem('token');
        axios({url: 'http://localhost:3000/api/message/', method: 'GET', headers: { Authorization: 'Bearer ' + token} })
        .then(resp => {
          console.log(resp);
          commit('SET_MESSAGES', resp.data);
          resolve(resp)
        })
        .catch(err => {
          commit('SET_MESSAGE_ERROR')
          reject(err)
        })
      })
    }
  }
});


