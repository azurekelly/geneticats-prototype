import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import {randomCat} from '../utils/breeding';

// this needs to be set manually rather than using the default of the reducer, since it's a random value
const initialState = {
    goal: randomCat()
};

const store = createStore(rootReducer, initialState, devToolsEnhancer());

export default store;