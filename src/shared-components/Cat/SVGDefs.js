import React from 'react';
import Head from './pieces/Head';
import OuterEye from './pieces/OuterEye';
import Point from './markings/Point';
import Tortie from './markings/Tortie';

const SVGDefs = ({id, headSize, eyeShape, torbie, point}) => (
    <defs>
        <filter id={'head-shadow-' + id} width={'200%'} height={'200%'}>
            <feDropShadow dx='0.5' dy='3' stdDeviation='2' floodOpacity='0.5' />
            <feDropShadow dx='0' dy='3' stdDeviation='3' floodOpacity='0.35' />
        </filter>
        <filter id={'eye-shadow-' + id} width={'200%'} height={'200%'}>
            <feDropShadow dx='0.5' dy='2' stdDeviation='2.5' floodOpacity='0.8' />
        </filter>
        <filter id={'muzzle-shadow-' + id} width={'200%'} height={'200%'}>
            <feDropShadow dx='3' dy='4' stdDeviation='2.25' floodOpacity='0.6' />
            <feDropShadow dx='-3' dy='5' stdDeviation='4' floodOpacity='0.25' />
        </filter>
        <clipPath id={'head-' + id}>
            <Head headSize={headSize} />
        </clipPath>
        <clipPath id={'eyes-' + id}>
            <OuterEye eyeShape={eyeShape} />
        </clipPath>
        {point && (
            <clipPath id={'point-' + id}>
                <Point />
            </clipPath>
        )}
        {torbie && (
            <clipPath id={'tortie-' + id}>
                <Tortie />
            </clipPath>
        )}
        <symbol id={'shine-' + id} viewBox='-2.2 -2.2 4.3 4.3'>
            <circle r='2.2' fill='#fff' stroke='none' />
        </symbol>
        <symbol id={'pupil-' + id} viewBox='-6.2 -10.1 12.3 20.3'>
            <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
        </symbol>
    </defs>
);

export default SVGDefs;