import axios from 'axios';

// Actions

export const getMessages = ({commit}) => {
  return new Promise((resolve, reject) => {
    const token = localStorage. getItem('token');
    axios({url: 'http://localhost:3000/api/message/', method: 'GET', headers: { Authorization: 'Bearer ' + token} })
    .then(resp => {
      console.log(resp);
      commit('SET_MESSAGES', resp.data);
      resolve(resp)
    })
    .catch(err => {
      commit('SET_ERROR')
      reject(err)
    })
  })
}

export const login = ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('AUTH_REQUEST')
      axios({url: 'http://localhost:3000/api/user/login', data: user, method: 'POST' })
      .then(resp => {
        console.log(resp);
        const token = resp.data.token;
        //const userId = resp.data.userId;
        //console.log(userId);
        localStorage.setItem('token', token);
        //axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        commit('AUTH_SUCCESS', resp.data);
        resolve(resp)
      })
      .catch(err => {
        commit('AUTH_ERROR')
        localStorage.removeItem('token')
        reject(err)
      })
    })
}