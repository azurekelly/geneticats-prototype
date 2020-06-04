import React from 'react';

const Ears = ({earSet, rightColor, leftColor}) => {
    const leftTransform = [
        'scale(1 -1) rotate(-18 -339 -457)',
        'scale(1 -1) rotate(-9.9 -704.6 -728.6)',
        'matrix(1 0 0 -1 104.8 139.2)',
        'scale(1 -1) rotate(8 1092.7 621.5)',
        'scale(1 -1) rotate(19 516 191.6)'
    ];
    const rightTransform = [
        'rotate(162 114.5 83.3)',
        'rotate(170.1 124.1 77.2)',
        'rotate(180 134.4 69.6)',
        'rotate(-172 144.6 63.5)',
        'rotate(-161 154.9 55)'
    ];

    return (
        <g className='ears' transform='translate(8 -22)'>
            <symbol id='ear' viewBox='-64 -75.8 127.9 151.5'>
                <path stroke='none' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use fill={leftColor} width='127.9' height='151.5' x={-64} y='-75.8' transform={leftTransform[earSet]} xlinkHref='#ear' />
            <use fill={rightColor} width='127.9' height='151.5' x={-64} y='-75.8' transform={rightTransform[earSet]} xlinkHref='#ear' />
        </g>
    );
};

export default Ears;