import axios from 'axios';


// Actions

export const getMessages = ({ commit }) => {
    axios.get('http://localhost:3000/api/messages')
    .then(response => {
        commit('SET_MESSAGES', response.data)
    })
}

export const login = ({ commit }, User ) => {
    axios.post("http://localhost:3000/api/user/login", User)
    .then(response => {
        commit('SET_USER', response.data);
        localStorage.setItem("token", response.data.token);
    })
}