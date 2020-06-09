// ACTIONS
const START_SELECTING = 'START_SELECTING_PARENT';
const SELECT = 'SELECT_PARENT';
const CANCEL = 'CANCEL_BREEDING';

// ACTION CREATORS
export const startSelectingParent = targetSlot => ({
    type: START_SELECTING,
    payload: targetSlot
});
export const selectParent = cat => ({
    type: SELECT,
    payload: cat
});
export const cancelParentSelection = () => ({
    type: CANCEL
});

// SELECTORS
export const isSelectingSelector = state => state.breeding.target !== null;
export const targetParentSlotSelector = state => state.breeding.target;
export const breedingParentsSelector = state => state.breeding.parents;

//REDUCERS
const breedReducer = (state = {target: null, parents: [null, null]}, action) => {
    switch(action.type) {
        case START_SELECTING:
            return {...state, target: action.payload};
        case SELECT:
            return {
                parents: state.parents.map((cat, i) => (i == state.target ? action.payload : cat)),
                target: null
            };
        case CANCEL:
            return {parents: [null, null], target: null};
        default:
            return state;
    }
};

export default breedReducer;