import {createStore} from 'redux';
import reducer from '../reducers';

let store = createStore(reducer);//传入reducer
export default store;
