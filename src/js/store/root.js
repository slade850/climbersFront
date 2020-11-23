import { combineReducers } from 'redux';

import auth from './authStore';
import message from './messageStore';
import post from './postStore';

const creatRootReducer = combineReducers({
    //add imported reducer
    auth,
    message,
    post
});

export default creatRootReducer;