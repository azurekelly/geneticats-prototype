import React from 'react';
import {useDispatch} from 'react-redux';
import {changeRoute} from '../redux/modules/route';
import {cancelParentSelection} from '../redux/modules/breeding';

const BackButton = () => {
    const dispatch = useDispatch();
    return <div id='back-btn' onClick={() => {
        dispatch(changeRoute('home'));
        dispatch(cancelParentSelection());
    }}><span>◄</span></div>;
};

export default BackButton;