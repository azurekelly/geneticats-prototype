import React from 'react';

const Eyes = ({eyeShape, color = 'white'}) => (
    <>
        {/* <g className='eyes eyes1' transform='translate(8 -22)'>
            <symbol id='shine1' viewBox='-2.2 -2.2 4.3 4.3'>
                <circle r='2.2' fill='#fff' className='st2' />
            </symbol>
            <symbol id='pupil1' viewBox='-6.2 -10.1 12.3 20.3'>
                <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
            </symbol>
            <path fill='none' stroke='#000' strokeMiterlimit={10} d='M143.6 206.5c-10.9-5.7-11.9-12.9-11.9-12.9s6-5.3 17.8-.9c11.8 4.4 13.5 13.8 13.5 13.8s-10.4 4.8-19.4 0zm87.2 0c10.9-5.7 11.9-12.9 11.9-12.9s-6-5.3-17.8-.9c-11.8 4.4-13.5 13.8-13.5 13.8s10.4 4.8 19.4 0z' className='iris' />
            <g className='inner'>
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil1' />
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil1' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine1' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine1' />
            </g>
        </g>
        <g className='eyes eyes2' transform='translate(8 -22)'>
            <symbol id='shine2' viewBox='-2.2 -2.2 4.3 4.3'>
                <circle r='2.2' fill='#fff' className='st2' />
            </symbol>
            <symbol id='pupil2' viewBox='-6.2 -10.1 12.3 20.3'>
                <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
            </symbol>
            <path fill='none' stroke='#000' strokeMiterlimit={10} d='M211.4 206.5s.4-11.1 12.2-15.5a18.5 18.5 0 0 1 19.1 2.6s.3 8.2-10.6 14.1c-10.5 5.8-20.7-1.2-20.7-1.2zm-48.4 0s-.4-11.1-12.2-15.5c-11.8-4.4-19.1 2.6-19.1 2.6s-.3 8.2 10.6 14.1c10.6 5.8 20.7-1.2 20.7-1.2z' className='iris' />
            <g className='inner'>
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil2' />
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil2' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine2' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine2' />
            </g>
        </g> */}
        <g className='eyes eyes3' transform='translate(8 -22)'>
            <symbol id='shine3' viewBox='-2.2 -2.2 4.3 4.3'>
                <circle r='2.2' fill='#fff' className='st2' />
            </symbol>
            <symbol id='pupil3' viewBox='-6.2 -10.1 12.3 20.3'>
                <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
            </symbol>
            <path fill={color} stroke='#000' strokeMiterlimit={10} d='M211.4 206.5s.4-13.4 12.1-17.8a17.1 17.1 0 0 1 19.1 4.9s.7 9.6-10.2 15.5c-10.5 5.9-21-2.6-21-2.6zm-48.4 0s-.4-13.4-12.1-17.8-19.1 4.9-19.1 4.9-.7 9.6 10.2 15.5c10.5 5.9 21-2.6 21-2.6z' className='iris' />
            <g className='inner'>
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil3' />
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil3' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine3' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine3' />
            </g>
        </g>
        {/* <g className='eyes eyes4' transform='translate(8 -22)'>
            <symbol id='shine4' viewBox='-2.2 -2.2 4.3 4.3'>
                <circle r='2.2' fill='#fff' className='st2' />
            </symbol>
            <symbol id='pupil4' viewBox='-6.2 -10.1 12.3 20.3'>
                <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
            </symbol>
            <path fill='none' stroke='#000' strokeMiterlimit={10} d='M211.4 206.5s-1.3-15.8 10.6-19.9c13.8-4.6 20.7 7 20.7 7s1.5 11-9.3 17c-10.6 5.8-22-4.1-22-4.1zm-48.4 0s1.3-15.8-10.6-19.9c-13.8-4.6-20.7 7-20.7 7s-1.5 11 9.3 17c10.7 5.8 22-4.1 22-4.1z' className='iris' />
            <g className='inner'>
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil4' />
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil4' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine4' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine4' />
            </g>
        </g>
        <g className='eyes eyes5' transform='translate(8 -22)'>
            <symbol id='shine5' viewBox='-2.2 -2.2 4.3 4.3'>
                <circle r='2.2' fill='#fff' className='st2' />
            </symbol>
            <symbol id='pupil5' viewBox='-6.2 -10.1 12.3 20.3'>
                <path d='M0-10.1c2 0 6.2 3.2 6.2 10.1 0 6.9-4.4 10.1-6.2 10.1-1.9 0-6.1-3.2-6.1-10.1 0-6.9 4.2-10.1 6.1-10.1z' />
            </symbol>
            <path fill='none' stroke='#000' strokeMiterlimit={10} d='M211.4 206.5s-5.5-17.7 10.8-22.4c16.3-4.6 20.4 9.5 20.4 9.5s3.5 13.4-10.5 19.1c-11.6 4.9-20.7-6.2-20.7-6.2zm-48.2.2s5.5-17.7-10.8-22.4c-16.3-4.6-20.4 9.5-20.4 9.5s-3.5 13.4 10.5 19.1c11.6 4.8 20.7-6.2 20.7-6.2z' className='iris' />
            <g className='inner'>
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 148 199.4)' xlinkHref='#pupil5' />
                <use width='12.3' height='20.3' x='-6.2' y='-10.1' transform='matrix(1 0 0 -1 226.4 199.4)' xlinkHref='#pupil5' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 231.8 193.5)' xlinkHref='#shine5' />
                <use width='4.3' height='4.3' x='-2.2' y='-2.2' transform='matrix(1 0 0 -1 154.2 197.9)' xlinkHref='#shine5' />
            </g>
        </g> */}
    </>
);

export default Eyes;