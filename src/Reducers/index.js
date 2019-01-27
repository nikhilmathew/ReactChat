import { combineReducers } from 'redux';
import  authReducer  from './authReducer';
import chatListReducer from './chatListReducer';

export default combineReducers({
    auth: authReducer,
    chatList:chatListReducer
})