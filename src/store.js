import  { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './Reducers'
const initialState ={};

const middleware =[thunk]; //,createLogger()];

const store = createStore(rootReducer,initialState,applyMiddleware(...middleware))

export default store;