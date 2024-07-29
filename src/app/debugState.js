export const TOGGLE_DEBUG = 'TOGGLE_DEBUG';

export const toggleDebug = () => ({
  type: TOGGLE_DEBUG,
});

export const debugSelector = (state) => state.debugMode;

const reducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DEBUG:
      return !state;
    default:
      return state;
  }
};

export default reducer;
