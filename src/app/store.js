import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import {randomCat} from '../utils/genetics';

// this needs to be set manually rather than using the default of the reducer, since it's a random value
const initialState = {
    goal: randomCat()
};

const persistConfig = {
    key: 'root',
    storage: localStorage,
    blacklist: ['breeding', 'route']
};

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    initialState,
    devToolsEnhancer()
);

export const persistor = persistStore(store);