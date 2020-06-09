import React from 'react';
import {useDispatch} from 'react-redux';
import {changeToHome} from '../app/routeState';

const BackButton = () => {
    const dispatch = useDispatch();
    return <div id='back-btn' onClick={() => dispatch(changeToHome())}><span>◄</span></div>;
};

export default BackButton;