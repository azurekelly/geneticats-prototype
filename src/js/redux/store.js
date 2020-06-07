import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import uniqid from 'uniqid';
import rootReducer from './rootReducer';
import {randomGenotype} from '../breeding';

// this needs to be set manually rather than using the default of the reducer, since it's a random value
const initialState = {
    goal: {id: uniqid(), genotype: randomGenotype()}
};

const store = createStore(rootReducer, initialState, devToolsEnhancer());

export default store;