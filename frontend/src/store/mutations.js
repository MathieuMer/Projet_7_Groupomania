export const SET_MESSAGES = (state, messages) => {
    state.messages = messages;
}

export const AUTH_REQUEST = (state) => {
    state.status = 'loading'
}

export const AUTH_SUCCESS = (state, resp) => {
    state.status = 'success';
    state.token = resp.token;
    state.userId = resp.userId;
    console.log(state.userId);
}

export const AUTH_ERROR = (state) => {
    state.status = 'error';
}