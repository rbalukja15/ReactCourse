//The main point of this reducer is to bring together all the other reducers
import { combineReducers } from 'redux';
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import {alertReducer} from "./alertReducer";

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    alert: alertReducer,
})