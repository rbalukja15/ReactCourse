import { createStore } from 'redux';
import itemReducer from "./redux/reducers/itemReducer";

const store = createStore(itemReducer);
export default store;