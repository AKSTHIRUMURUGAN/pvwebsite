import {combineReducers, configureStore} from  '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from "./slices/authSlice";

import orderReducer from "./slices/orderSlice"

const reducer=combineReducers({

  authState:authReducer,
  orderState:orderReducer
})
const store=configureStore({
    reducer,
    middleware:[thunk]
})
export default store;