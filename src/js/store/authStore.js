import { combineReducers } from 'redux';
import api from '../utils/api'
import { setStorageLogged } from '../utils/local-storage'

export const doLogin = (body) => {
    return dispatch => {
        dispatch({ type: "DOING_LOGIN" })

        return api
            .post('user/login', body)
                .then(response => {
                    console.log(response.data)
                    dispatch({type: 'SET_USER', payload: response.data.user})
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: response.data.message })
                    setStorageLogged(true)
                    })
                .catch(err => {
                    dispatch({ type: "SET_AUTH_MESSAGE", payload: err.response.data.message })
                    setStorageLogged(false)
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_AUTH_MESSAGE"})}, 2000) )
    }
}


const defaultUserState = {
    isLogged: false,
    ioId: '',
    detail: {},
}

const user = (state = defaultUserState, action) => {
    const userAction = {
        "SET_USER": {...state, isLogged: true, detail: action.payload},
        "SET_SOCKETOKEN": {...state, sockeToken: action.payload},
        "SET_IO_ID": {...state, ioId: action.payload},
        "SET_USER_LOGGED": {...state, isLogged: action.payload},
        "CLEAR_USER": defaultUserState
    }
    return userAction[action.type] || state;
}

const authMessage = (state = {message: null} , action) => {
    const authMessageAction = {
        "SET_AUTH_MESSAGE": {...state, message: action.payload },
        "CLEAR_AUTH_MESSAGE": {...state, message: null }
    }
    return authMessageAction[action.type] || state;
}

const authFuntion = (state = false, action) => {
    const authFuntionAction = {
        "DOING_LOGIN": true
    }
    return authFuntionAction[action.type] || state;
}



const authReducer = combineReducers({
    user,
    authMessage,
    authFuntion
});


export default authReducer;