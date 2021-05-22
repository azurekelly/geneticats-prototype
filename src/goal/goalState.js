const COMPLETE = 'COMPLETE_GOAL';

export const completeGoal = newGoal => ({
    type: COMPLETE,
    payload: newGoal
});

export const scoreSelector = state => state.score;
export const goalSelector = state => state.goal;

export const scoreReducer = (state = 0, action) => {
    switch(action.type) {
        case COMPLETE:
            return state + 50;
        default:
            return state;
    }
};
// initial goal should be set on store creation, it needs to be a randomized cat
export const goalReducer = (state = {}, action) => {
    switch(action.type) {
        case COMPLETE:
            return action.payload;
        default:
            return state;
    }
};
