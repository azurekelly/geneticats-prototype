import {combineReducers} from 'redux';
import route from './modules/route';
import catStore from './modules/catStore';

const rootReducer = combineReducers({
    route,
    catStore
});

export default rootReducer;