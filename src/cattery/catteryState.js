import {WITHDRAW, DEPOSIT} from '../storage/storageState';

// TYPES
export const ADOPT = 'ADOPT_CAT';

// ACTIONS
export const adoptCat = cat => ({
    type: ADOPT,
    payload: cat
});

// SELECTORS
export const catterySelector = state => state.cattery;

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

export default catteryReducer;