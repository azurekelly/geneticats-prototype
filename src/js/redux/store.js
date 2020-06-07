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
        storage: [
            {id: uniqid(), genotype: randomGenotype()},
            {id: uniqid(), genotype: randomGenotype()},
            {id: uniqid(), genotype: randomGenotype()}
        ]
    },
    route: 'home',
    score: 0,
    goal: {id: uniqid(), genotype: randomGenotype()}
};

const store = createStore(rootReducer, initialState, devToolsEnhancer());

export default store;