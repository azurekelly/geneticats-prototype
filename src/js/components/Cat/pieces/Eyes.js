import React from 'react';
import OuterEye from './OuterEye';

const Eyes = ({eyeShape, color = 'white'}) => (
    <g transform='translate(8 -22)'>
        <symbol id='shine' viewBox='-2.2 -2.2 4.3 4.3'>
            <circle r='2.2' fill='#fff' stroke='none' />
        </symbol>
        <symbol id='pupil' viewBox='-6.2 -10.1 12.3 20.3'>
            <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
        </symbol>
        <OuterEye eyeShape={eyeShape} color={color} />
        <g className='inner'>
            <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil' />
            <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil' />
            <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine' />
            <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine' />
        </g>
    </g>
);

export default Eyes;