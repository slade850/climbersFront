import { combineReducers } from 'redux';

import auth from './authStore';
import message from './messageStore';
import post from './postStore';
import contact from './contactStore';

const creatRootReducer = combineReducers({
    //add imported reducer
    auth,
    message,
    post,
    contact
});

export default creatRootReducer;