export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const CHANGE_TO_HOME = 'CHANGE_TO_HOME';

export const changeRoute = route => ({
    type: CHANGE_ROUTE,
    payload: route
});
export const changeToHome = () => ({
    type: CHANGE_TO_HOME,
    payload: 'home'
});

export const routeSelector = state => state.route;

const reducer = (state = 'home', action) => {
    switch(action.type) {
        case CHANGE_ROUTE:
        case CHANGE_TO_HOME:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;