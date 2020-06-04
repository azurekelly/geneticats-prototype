import React from 'react';
import Head from './pieces/Head';
import OuterEye from './pieces/OuterEye';
import Point from './markings/Point';
import Tortie from './markings/Tortie';

const SVGDefs = ({id, headSize, eyeShape}) => (
    <defs>
        <filter id={'head-shadow-' + id}>
            <feDropShadow dx='0.5' dy='3' stdDeviation='1' floodOpacity='0.7' />
        </filter>
        <filter id={'eye-shadow-' + id}>
            <feDropShadow dx='0.5' dy='2' stdDeviation='2' floodOpacity='0.6' />
        </filter>
        <filter id={'muzzle-shadow-' + id}>
            <feDropShadow dx='1.5' dy='2' stdDeviation='2' floodOpacity='0.7' />
        </filter>
        <clipPath id={'head-' + id}>
            <Head headSize={headSize} />
        </clipPath>
        <clipPath id={'eyes-' + id}>
            <OuterEye eyeShape={eyeShape} />
        </clipPath>
        <clipPath id={'point-' + id}>
            <Point />
        </clipPath>
        <clipPath id={'tortie-' + id}>
            <Tortie />
        </clipPath>
        <symbol id={'shine-' + id} viewBox='-2.2 -2.2 4.3 4.3'>
            <circle r='2.2' fill='#fff' stroke='none' />
        </symbol>
        <symbol id={'pupil-' + id} viewBox='-6.2 -10.1 12.3 20.3'>
            <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
        </symbol>
    </defs>
);

export default SVGDefs;