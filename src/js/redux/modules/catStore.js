import {combineReducers} from 'redux';

const catteryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADOPT':
        case 'WITHDRAW':
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case 'DEPOSIT':
            return state.filter(cat => cat.id !== action.payload.id);
        default:
            return state;
    }
};

const storageReducer = (state = [], action) => {
    switch(action.type) {
        case 'DEPOSIT':
            return [
                {id: action.payload.id, genotype: action.payload.genotype},
                ...state
            ];
        case 'WITHDRAW':
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