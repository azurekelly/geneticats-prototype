import React from 'react';
import {mergeClasses} from '../utils/utils';

const SmallButton = ({disabled, onClick, className, children, ...props}) => (
    <div className={mergeClasses('small-btn' + (disabled ? ' disabled' : ''), className)} onClick={disabled ? undefined : onClick} {...props}>
        {children}
    </div>
);

export default SmallButton;