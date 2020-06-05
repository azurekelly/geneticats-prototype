import React from 'react';
import {useDispatch} from 'react-redux';
import {changeRoute} from '../redux/modules/route';

const BackButton = () => {
    const dispatch = useDispatch();
    return <div id='back-btn' onClick={() => dispatch(changeRoute('home'))}><span>◄</span></div>;
};

export default BackButton;