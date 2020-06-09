import React from 'react';
import {useDispatch} from 'react-redux';
import BigButton from '../shared-components/BigButton';
import {changeRoute} from '../app/routeState';

const Home = () => {
    const dispatch = useDispatch();
    return (
        <div id='home-screen'>
            <BigButton onClick={() => dispatch(changeRoute('breed'))}>Breed</BigButton>
            <BigButton onClick={() => dispatch(changeRoute('adopt'))}>Adopt</BigButton>
            <BigButton onClick={() => dispatch(changeRoute('storage'))}>Storage</BigButton>
        </div>
    );
};

export default Home;