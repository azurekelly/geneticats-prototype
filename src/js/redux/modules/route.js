export const changeRoute = route => ({
    type: 'CHANGE',
    payload: route
});

const reducer = (state = 'home', action) => {
    switch(action.type) {
        case 'CHANGE':
            return action.payload;
        default:
            return state;
    }
};

export default reducer;