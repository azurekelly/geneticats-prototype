import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import uniqid from 'uniqid';
import rootReducer from './rootReducer';
import {randomGenotype} from '../breeding';

const initialState = {
    catStore: {
        cattery: [
            {id: uniqid(), genotype: randomGenotype()},
            {id: uniqid(), genotype: randomGenotype()},
            {id: uniqid(), genotype: randomGenotype()}
        ],
        storage: []
    }
};

const store = createStore(rootReducer, initialState, devToolsEnhancer());

export default store;