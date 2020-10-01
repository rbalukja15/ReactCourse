import { createStore, applyMiddleware, compose } from 'redux';
import itemReducer from "./redux/reducers/itemReducer";
import thunk from 'redux-thunk';
//import rootReducer from './reducers';
const initialState = {};

const middleware = [thunk];

//Client need to install the redux devtools on chrome for it to work
//this can be done instead: window._REDUX_DEVTOOLS_EXTENSION_ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(itemReducer, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;