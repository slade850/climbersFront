import { combineReducers } from 'redux';
import api from '../utils/api'

export const getConversations = () => {
    return dispatch => {
        dispatch({ type: "GET_CONVERSATIONS" })

        return api
            .get('private-message')
                .then(response => {
                    let totalNewMs = 0;
                    const userMsg = response.data.userMsg;
                    const groupMsg = response.data.groupMsg;
                    if(userMsg.length){
                        dispatch({type: 'SET_USERS_TALKS', payload: userMsg});
                        totalNewMs += userMsg.length > 1 ? userMsg.reduce((a , c) => a + c.new_messages , 0) : userMsg[0].new_messages;
                    }
                    if(groupMsg.length){
                        dispatch({type: 'SET_USERS_TALKS_GROUP', payload: groupMsg});
                        totalNewMs += groupMsg.length > 1 ? groupMsg.reduce((a , c) => a + c.new_messages , 0) : groupMsg[0].new_messages;
                    }
                    dispatch({type: 'SET_TOTAL_NEW_MESSAGE', payload: totalNewMs})
                    })
                .catch(err => {
                    dispatch({ type: "SET_USERS_TALK_ERROR", payload: err.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_USERS_TALK_ERROR"})}, 2000) )
    }
}

export const getInvitations = () => {
    return dispatch => {
        dispatch({ type: "GET_INVITATIONS" })

        return api
            .get('private-message/invitation')
                .then(response => {
                    console.log(response);
                    let totalNewIv = 0;
                    const invitations = response.data.data;
                    if(invitations.length){
                        dispatch({type: 'SET_USERS_INVITATIONS', payload: invitations});
                        totalNewIv += invitations.reduce((a , c) => a + 1 , 0);
                    }
                    dispatch({type: 'SET_TOTAL_INVITATIONS', payload: totalNewIv})
                    })
                .catch(err => {
                    dispatch({ type: "SET_USERS_INVITATIONS_ERROR", payload: err.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_USERS_INVITATIONS_ERROR"})}, 2000) )
    }
}

export const getTalkFrom = (contactSlug) => {
    return dispatch => {
        dispatch({ type: "GET_TALK_FROM" })

        return api
            .get(`private-message/from/${contactSlug}`)
                .then(response => {
                    dispatch({type: 'SET_MESSAGES_FROM', payload: { [contactSlug]: response.data.data } })
                    dispatch({type: 'SET_MESSAGES_FROM_ID', payload: response.data.contactId })
                    })
                .catch(err => {
                    dispatch({ type: "SET_MESSAGES_FROM_ERROR", payload: err.response.data.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_MESSAGES_FROM_ERROR"})}, 2000) )
    }
}

export const getTalkGroupFrom = (groupSlug) => {
    return dispatch => {
        dispatch({ type: "GET_TALK_GROUP_FROM" })

        return api
            .get(`group-message/from/${groupSlug}`)
                .then(response => {
                    dispatch({type: 'SET_MESSAGES_GROUP_FROM', payload: { [groupSlug]: response.data.data } })
                    dispatch({type: 'SET_MESSAGES_GROUP_FROM_ID', payload: response.data.groupId })
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
    talks: [],
    groups: [],
}

const usersTalk = (state = defaultUsersTalk, action) => {
    const usersTalkAction = {
        "SET_USERS_TALKS": {...state, talks: action.payload},
        "SET_USERS_TALKS_GROUP": {...state, groups: action.payload},
        "SET_TOTAL_NEW_MESSAGE": {...state, totalNewMessages: action.payload},
        "SET_USERS_TALK_ERROR": {...state, error: action.payload},
        "CLEAR_USERS_TALK_ERROR": {...state, error: null},
        "CLEAR_USERS_TALKS": defaultUsersTalk
    }
    return usersTalkAction[action.type] || state;
}

const defaultInvitation = {
    totalInvitations: 0,
    invitations: [],
    error: null
}

const usersInvitation = (state = defaultInvitation, action) => {
    const usersInvitAction = {
        "SET_USERS_INVITATIONS": {...state, invitations: action.payload},
        'SET_TOTAL_INVITATIONS': {...state, totalInvitations: action.payload},
        "SET_USERS_INVITATIONS_ERROR": {...state, error: action.payload},
        "CLEAR_USERS_INVITATIONS_ERROR": {...state, error: null},
        "CLEAR_USERS_INVITATIONS": defaultInvitation
    }
    return usersInvitAction[action.type] || state;
}

const defaultMessagesFrom = {
    error: null,
    from: {},
    group: {},
    currentId: '',
    currentGroupId: ''
}

const messagesFrom = (state = defaultMessagesFrom, action) => {
    const messagesFromAction = {
        "SET_MESSAGES_FROM": {...state, from: action.payload },
        "SET_MESSAGES_FROM_ID": {...state, currentId: action.payload },
        "SET_MESSAGES_GROUP_FROM": {...state, group: action.payload },
        "SET_MESSAGES_GROUP_FROM_ID": {...state, currentGroupId: action.payload },
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
        "GET_TALK_GROUP_FROM": true,
        "GET_INVITATIONS": true
    }
    return messageFuntionAction[action.type] || state;
}



const messageReducer = combineReducers({
    usersTalk,
    usersInvitation,
    messagesFrom,
    messageFuntion
});


export default messageReducer;