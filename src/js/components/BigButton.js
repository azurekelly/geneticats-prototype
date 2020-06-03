import React from 'react';

const BigButton = ({onClick, children}) => (
    <div className='big-btn' onClick={onClick}><span>{children}</span></div>
);

export default BigButton;