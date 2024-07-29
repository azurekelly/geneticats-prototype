import { combineReducers } from 'redux';
import route from './routeState';
import debugMode from './debugState';
import cattery from '../cattery/catteryState';
import storage from '../storage/storageState';
import { scoreReducer, goalReducer } from '../goal/goalState';
import breeding from '../breed/breedState';

const rootReducer = combineReducers({
  route,
  cattery,
  storage,
  score: scoreReducer,
  goal: goalReducer,
  breeding,
  debugMode,
});

export default rootReducer;
