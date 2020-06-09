import {combineReducers} from 'redux';

// ACTIONS
const START_SELECTING = 'START_SELECTING_PARENT';
const SELECT = 'SELECT_PARENT';
const CANCEL = 'CANCEL_BREEDING';

// ACTION CREATORS
export const startSelectingParent = targetSlot => ({
    type: START_SELECTING,
    payload: targetSlot
});
export const selectParent = (target, cat) => ({
    type: SELECT,
    payload: {
        target,
        cat
    }
});
export const cancelParentSelection = () => ({
    type: CANCEL
});

// SELECTORS
export const isSelectingSelector = state => state.breeding.isSelecting;
export const targetParentSlotSelector = state => state.breeding.targetSlot;
export const breedingParentsSelector = state => state.breeding.parents;

//REDUCERS
const isSelectingReducer = (state = false, action) => {
    switch(action.type) {
        case START_SELECTING:
            return true;
        case SELECT:
        case CANCEL:
            return false;
        default:
            return state;
    }
};
const targetSlotReducer = (state = null, action) => {
    switch(action.type) {
        case START_SELECTING:
            return action.payload;
        case SELECT:
        case CANCEL:
            return null;
        default:
            return state;
    }
};
const parentsReducer = (state = [null, null], action) => {
    switch(action.type) {
        case SELECT:
            return state.map((cat, i) => (i == action.payload.target ? action.payload.cat : cat));
        case CANCEL:
            return [null, null];
        default:
            return state;
    }
};

const allReducers = combineReducers({
    isSelecting: isSelectingReducer,
    targetSlot: targetSlotReducer,
    parents: parentsReducer
});

export default allReducers;