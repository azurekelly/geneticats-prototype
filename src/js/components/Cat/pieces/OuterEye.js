import React from 'react';

const OuterEye = ({eyeShape, color}) => {
    const eyeData = [
        'M143.6 206.5c-10.9-5.7-11.9-12.9-11.9-12.9s6-5.3 17.8-.9c11.8 4.4 13.5 13.8 13.5 13.8s-10.4 4.8-19.4 0zm87.2 0c10.9-5.7 11.9-12.9 11.9-12.9s-6-5.3-17.8-.9c-11.8 4.4-13.5 13.8-13.5 13.8s10.4 4.8 19.4 0z',
        'M211.4 206.5s.4-11.1 12.2-15.5a18.5 18.5 0 0 1 19.1 2.6s.3 8.2-10.6 14.1c-10.5 5.8-20.7-1.2-20.7-1.2zm-48.4 0s-.4-11.1-12.2-15.5c-11.8-4.4-19.1 2.6-19.1 2.6s-.3 8.2 10.6 14.1c10.6 5.8 20.7-1.2 20.7-1.2z',
        'M211.4 206.5s.4-13.4 12.1-17.8a17.1 17.1 0 0 1 19.1 4.9s.7 9.6-10.2 15.5c-10.5 5.9-21-2.6-21-2.6zm-48.4 0s-.4-13.4-12.1-17.8-19.1 4.9-19.1 4.9-.7 9.6 10.2 15.5c10.5 5.9 21-2.6 21-2.6z',
        'M211.4 206.5s-1.3-15.8 10.6-19.9c13.8-4.6 20.7 7 20.7 7s1.5 11-9.3 17c-10.6 5.8-22-4.1-22-4.1zm-48.4 0s1.3-15.8-10.6-19.9c-13.8-4.6-20.7 7-20.7 7s-1.5 11 9.3 17c10.7 5.8 22-4.1 22-4.1z',
        'M211.4 206.5s-5.5-17.7 10.8-22.4c16.3-4.6 20.4 9.5 20.4 9.5s3.5 13.4-10.5 19.1c-11.6 4.9-20.7-6.2-20.7-6.2zm-48.2.2s5.5-17.7-10.8-22.4c-16.3-4.6-20.4 9.5-20.4 9.5s-3.5 13.4 10.5 19.1c11.6 4.8 20.7-6.2 20.7-6.2z'
    ];

    return <path fill={color} stroke='#000' strokeMiterlimit={10} d={eyeData[eyeShape]} />;
};

export default OuterEye;