import React from 'react';
import OuterEye from './OuterEye';

const Eyes = ({id, eyeShape, color = 'white'}) => (
    <g transform='translate(8 -22)'>
        <OuterEye eyeShape={eyeShape} color={color} />
        <g className='inner' clipPath={`url(#eyes-${id})`}>
            <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref={`#pupil-${id}`} />
            <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref={`#pupil-${id}`} />
            <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref={`#shine-${id}`} />
            <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref={`#shine-${id}`} />
        </g>
    </g>
);

export default Eyes;