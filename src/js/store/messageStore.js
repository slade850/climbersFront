import { combineReducers } from 'redux';
import api from '../utils/api'

export const getConversations = () => {
    return dispatch => {
        dispatch({ type: "GET_CONVERSATIONS" })

        return api
            .get('private-message')
                .then(response => {
                    const data = response.data.data;
                    dispatch({type: 'SET_USERS_TALKS', payload: data})
                    if(data.length){
                        let nbNewMs = data.length > 1 ? data.reduce((a , c) => a + c.new_messages , 0) : data[0].new_messages;
                        console.log(nbNewMs);
                        dispatch({type: 'SET_TOTAL_NEW_MESSAGE', payload: nbNewMs})
                    }
                    })
                .catch(err => {
                    dispatch({ type: "SET_USERS_TALK_ERROR", payload: err.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_USERS_TALK_ERROR"})}, 2000) )
    }
}

export const getTalkFrom = (contactId) => {
    return dispatch => {
        dispatch({ type: "GET_TALK_FROM" })

        return api
            .get(`private-message/from/${contactId}`)
                .then(response => {
                    dispatch({type: 'SET_MESSAGES_FROM', payload: { [contactId]: response.data.data } })
                    })
                .catch(err => {
                    dispatch({ type: "SET_MESSAGES_FROM_ERROR", payload: err.response.data.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_MESSAGES_FROM_ERROR"})}, 2000) )
    }
}

const defaultUsersTalk = {
    error: null,
    totalNewMessages: 0,
    talks: []
}

const usersTalk = (state = defaultUsersTalk, action) => {
    const usersTalkAction = {
        "SET_USERS_TALKS": {...state, talks: action.payload},
        "SET_TOTAL_NEW_MESSAGE": {...state, totalNewMessages: action.payload},
        "SET_USERS_TALK_ERROR": {...state, error: action.payload},
        "CLEAR_USERS_TALK_ERROR": {...state, error: null},
        "CLEAR_USERS_TALKS": defaultUsersTalk
    }
    return usersTalkAction[action.type] || state;
}

const defaultMessagesFrom = {
    error: null,
    from: {}
}

const messagesFrom = (state = defaultMessagesFrom, action) => {
    const messagesFromAction = {
        "SET_MESSAGES_FROM": {...state, from: action.payload },
        "SET_MESSAGES_FROM_ERROR": {...state, error: action.payload},
        "CLEAR_MESSAGES_FROM_ERROR": {...state, error: null},
        "CLEAR_MESSAGES_FROM": defaultMessagesFrom
    }
    return messagesFromAction[action.type] || state;
}

const messageFuntion = (state = false, action) => {
    const messageFuntionAction = {
        "GET_CONVERSATIONS": true,
        "GET_TALK_FROM": true,
    }
    return messageFuntionAction[action.type] || state;
}



const messageReducer = combineReducers({
    usersTalk,
    messagesFrom,
    messageFuntion
});


export default messageReducer;