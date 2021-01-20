import { combineReducers } from 'redux';
import api from '../utils/api';

export const getContact = () => {
    return dispatch => {
        dispatch({ type: "GET_CONTACT" })

        return api
            .get('user/contacts')
                .then(response => {
                    console.log(response.data)
                    dispatch({type: 'SET_CONTACT_LIST', payload: response.data.contacts})
                    dispatch({ type: "SET_CONTACT_MESSAGE", payload: response.data.message })
                    })
                .catch(err => {
                    dispatch({ type: "SET_CONTACT_MESSAGE", payload: err.response.data.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_CONTACT_MESSAGE"})}, 2000) )
    }
}

const defaultContactState = {
    contacts: [],
}

const contacts = (state = defaultContactState, action) => {
    const contactAction = {
        "SET_CONTACT_LIST": {...state, contacts: action.payload},
        "CLEAR_USER": defaultContactState
    }
    return contactAction[action.type] || state;
}

const defaultSearchState = {
    searchList: [],
}

const searchUser = (state = defaultSearchState, action) => {
    const searchUserAction = {
        "SET_SEARCH_LIST": {...state, searchList: action.payload},
        "CLEAR_SEARCH_LIST": {...state, searchList: defaultSearchState}
    }
    return searchUserAction[action.type] || state;
}

const contactMessage = (state = {message: null} , action) => {
    const contactMessageAction = {
        "SET_CONTACT_MESSAGE": {...state, message: action.payload },
        "CLEAR_CONTACT_MESSAGE": {...state, message: null }
    }
    return contactMessageAction[action.type] || state;
}

const contactFuntion = (state = false, action) => {
    const contactFuntionAction = {
        "GET_CONTACT": true
    }
    return contactFuntionAction[action.type] || state;
}

const contactReducer = combineReducers({
    contacts,
    searchUser,
    contactMessage,
    contactFuntion
});


export default contactReducer;