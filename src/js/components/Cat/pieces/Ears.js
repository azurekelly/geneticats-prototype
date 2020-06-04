import React from 'react';

const Ears = ({earSet, color = 'white'}) => (
    <>
        {/* <g className='ears ears1' transform='translate(8 -22)'>
            <symbol id='ear1' viewBox='-64 -75.8 127.9 151.5'>
                <path stroke='#000' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='left' transform='scale(1 -1) rotate(-18 -339 -457)' xlinkHref='#ear1' />
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='right' transform='rotate(162 114.5 83.3)' xlinkHref='#ear1' />
        </g>
        <g className='ears ears2' transform='translate(8 -22)'>
            <symbol id='ear2' viewBox='-64 -75.8 127.9 151.5'>
                <path stroke='#000' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='left' transform='scale(1 -1) rotate(-9.9 -704.6 -728.6)' xlinkHref='#ear2' />
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='right' transform='rotate(170.1 124.1 77.2)' xlinkHref='#ear2' />
        </g> */}
        <g className='ears ears3' transform='translate(8 -22)'>
            <symbol id='ear3' viewBox='-64 -75.8 127.9 151.5'>
                <path fill={color} stroke='#000' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='left' transform='matrix(1 0 0 -1 104.8 139.2)' xlinkHref='#ear3' />
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='right' transform='rotate(180 134.4 69.6)' xlinkHref='#ear3' />
        </g>
        {/* <g className='ears ears4' transform='translate(8 -22)'>
            <symbol id='ear4' viewBox='-64 -75.8 127.9 151.5'>
                <path stroke='#000' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='left' transform='scale(1 -1) rotate(8 1092.7 621.5)' xlinkHref='#ear4' />
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='right' transform='rotate(-172 144.6 63.5)' xlinkHref='#ear4' />
        </g>
        <g className='ears ears5' transform='translate(8 -22)'>
            <symbol id='ear5' viewBox='-64 -75.8 127.9 151.5'>
                <path stroke='#000' d='M-60 74.6C-49.2 81.2-.8 39.7 41.9 13c24.6-15.4 30.9-43.1 4.3-71.9-26.5-28.9-62.4-14.6-77.6 5.3C-54.8-23.1-70.8 67.9-60 74.6z' />
            </symbol>
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='left' transform='scale(1 -1) rotate(19 516 191.6)' xlinkHref='#ear5' />
            <use width='127.9' height='151.5' x={-64} y='-75.8' className='right' transform='rotate(-161 154.9 55)' xlinkHref='#ear5' />
        </g> */}
    </>
);

export default Ears;