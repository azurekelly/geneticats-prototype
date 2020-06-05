import {combineReducers} from 'redux';

export const adoptCat = cat => ({
    type: 'ADOPT_CAT',
    payload: cat
});

export const depositCat = cat => ({
    type: 'DEPOSIT_CAT',
    payload: cat
});

export const withdrawCat = cat => ({
    type: 'WITHDRAW_CAT',
    payload: cat
});

const catteryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADOPT_CAT':
        case 'WITHDRAW_CAT':
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case 'DEPOSIT_CAT':
            return state.filter(cat => cat.id !== action.payload.id);
        default:
            return state;
    }
};

const storageReducer = (state = [], action) => {
    switch(action.type) {
        case 'DEPOSIT_CAT':
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case 'WITHDRAW_CAT':
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