import { combineReducers } from 'redux';

import auth from './authStore';
import message from './messageStore';

const creatRootReducer = combineReducers({
    //add imported reducer
    auth,
    message,
});

export default creatRootReducer;