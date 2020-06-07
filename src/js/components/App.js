import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Goal from './Goal';
import Cattery from './Cattery';
import Home from './Home';
import Storage from './Storage';
import Adopt from './Adopt';
import Breed from './Breed';
import {routeSelector} from '../redux/modules/route';

const App = () => {
    const route = useSelector(routeSelector);
    return (
        <>
            <Cattery />
            <Goal />
            <div id='main'>
                {route === 'home' && <Home />}
                {route === 'breed' && <Breed />}
                {route === 'adopt' && <Adopt />}
                {route === 'storage' && <Storage />}
            </div>
        </>
    );
};

export default App;