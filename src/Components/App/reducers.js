import { combineReducers } from 'redux'
import * as authReducers from './../Config/authReducers';

export default combineReducers({
    auth:authReducers.auth
})