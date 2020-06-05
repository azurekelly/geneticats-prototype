export const changeRoute = route => ({
    type: 'CHANGE_ROUTE',
    payload: route
});

const reducer = (state = 'home', action) => {
    switch(action.type) {
        case 'CHANGE_ROUTE':
            return action.payload;
        default:
            return state;
    }
};

export default reducer;