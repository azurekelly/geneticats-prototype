import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Goal from './Goal';
import Cattery from './Cattery';
import BigButton from './BigButton';
import Storage from './Storage';
import Adopt from './Adopt';
import {changeRoute, routeSelector} from '../redux/modules/route';

const App = () => {
    const route = useSelector(routeSelector);
    const dispatch = useDispatch();

    return (
        <>
            <Cattery />
            <Goal />
            <div id='main'>
                {route === 'home' && (
                    <div id='home-screen'>
                        <BigButton onClick={() => dispatch(changeRoute('breed'))}>Breed</BigButton>
                        <BigButton onClick={() => dispatch(changeRoute('adopt'))}>Adopt</BigButton>
                        <BigButton onClick={() => dispatch(changeRoute('storage'))}>Storage</BigButton>
                    </div>
                )}
                {route === 'adopt' && <Adopt />}
                {route === 'storage' && <Storage />}
            </div>
        </>
    );
};

export default App;