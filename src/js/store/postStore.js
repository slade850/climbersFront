import { combineReducers } from 'redux';
import api from '../utils/api'

export const getPosts = () => {
    return dispatch => {
        dispatch({ type: "GET_POSTS" })

        return api
            .get('post')
                .then(response => {
                    const data = response.data.data;
                    dispatch({type: 'SET_POSTS', payload: data})
                    })
                .catch(err => {
                    dispatch({ type: "SET_POSTS_ERROR", payload: err.message })
                })
                .finally(res => setTimeout(() => { dispatch({type: "CLEAR_POSTS_ERROR"})}, 2000) )
    }
}


const posts = (state = [], action) => {
    const postAction = {
        "SET_POSTS": action.payload,
        "CLEAR_POSTS": []
    }
    return postAction[action.type] || state;
}


const postsError = (state = null, action) => {
    const messagesFromAction = {
        "SET_POSTS_ERROR": action.payload,
        "CLEAR_POSTS_ERROR": null,
    }
    return messagesFromAction[action.type] || state;
}

const postsFuntion = (state = false, action) => {
    const messageFuntionAction = {
        "GET_POSTS": true,
    }
    return messageFuntionAction[action.type] || state;
}



const postReducer = combineReducers({
    posts,
    postsError,
    postsFuntion
});


export default postReducer;