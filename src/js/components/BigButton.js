import React from 'react';
import {mergeClasses} from '../utils';

const BigButton = ({disabled, onClick, className, children, ...props}) => (
    <div className={mergeClasses('big-btn' + (disabled ? ' disabled' : ''), className)} onClick={disabled ? undefined : onClick} {...props}>
        {children}
    </div>
);

export default BigButton;