import React from 'react';
import {useSelector} from 'react-redux';
import Goal from '../goal/Goal';
import Cattery from '../cattery/Cattery';
import Home from '../home/Home';
import Storage from '../storage/Storage';
import Adopt from '../adopt/Adopt';
import Breed from '../breed/Breed';
import {routeSelector} from './routeState';

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