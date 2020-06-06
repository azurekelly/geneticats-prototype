import {combineReducers} from 'redux';

// ACTIONS
const ADOPT = 'ADOPT_CAT';
const DEPOSIT = 'DEPOSIT_CAT';
const WITHDRAW = 'WITHDRAW_CAT';

// ACTION CREATORS
export const adoptCat = cat => ({
    type: ADOPT,
    payload: cat
});

export const depositCat = cat => ({
    type: DEPOSIT,
    payload: cat
});

export const withdrawCat = cat => ({
    type: WITHDRAW,
    payload: cat
});

// SELECTORS
export const catterySelector = state => state.catStore.cattery;
export const storageSelector = state => state.catStore.storage;

// REDUCERS
const catteryReducer = (state = [], action) => {
    switch(action.type) {
        case ADOPT:
        case WITHDRAW:
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case DEPOSIT:
            return state.filter(cat => cat.id !== action.payload.id);
        default:
            return state;
    }
};

const storageReducer = (state = [], action) => {
    switch(action.type) {
        case DEPOSIT:
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case WITHDRAW:
            return state.filter(cat => cat.id !== action.payload.id);
        default:
            return state;
    }
};

const reducer = combineReducers({
    cattery: catteryReducer,
    storage: storageReducer
});

export default reducer;