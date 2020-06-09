// TYPES
export const DEPOSIT = 'DEPOSIT_CAT';
export const WITHDRAW = 'WITHDRAW_CAT';

// ACTIONs
export const depositCat = cat => ({
    type: DEPOSIT,
    payload: cat
});

export const withdrawCat = cat => ({
    type: WITHDRAW,
    payload: cat
});

// SELECTORS
export const storageSelector = state => state.storage;

// REDUCERS
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

export default storageReducer;