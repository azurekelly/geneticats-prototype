import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/components/App';
import store from './js/redux/store';

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('game-container'));
