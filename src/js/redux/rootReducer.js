import {combineReducers} from 'redux';
import route from './modules/route';
import catStore from './modules/catStore';
import {scoreReducer, goalReducer} from './modules/goal';

const rootReducer = combineReducers({
    route,
    catStore,
    score: scoreReducer,
    goal: goalReducer
});

export default rootReducer;