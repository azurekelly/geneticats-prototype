import React from 'react';
import {mergeClasses} from '../utils';

const SmallButton = ({disabled, onClick, className, children, ...props}) => (
    <div className={mergeClasses('small-btn' + (disabled ? ' disabled' : ''), className)} onClick={disabled ? undefined : onClick} {...props}>
        <span>{children}</span>
    </div>
);

export default SmallButton;