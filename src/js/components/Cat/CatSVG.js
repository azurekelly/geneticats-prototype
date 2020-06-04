import React from 'react';
import ReactDOM from 'react-dom';
import uniqid from 'uniqid';
import Ears from './pieces/Ears';
import Head from './pieces/Head';
import Muzzle from './pieces/Muzzle';
import Eyes from './pieces/Eyes';
import Point from './markings/Point';
import Tabby from './markings/Tabby';
import Tortie from './markings/Tortie';
import White from './markings/White';
import SVGDefs from './SVGDefs';
import {phenotypeToColors} from '../../genetics';

const CatSVG = ({phenotype, headSize, eyeShape, earSet, muzzleLength, red, dilute, tabby, point, white}) => {
    const id = uniqid(); // TODO move to constructor. Cats shouldn't re-render often enough to cause a performance issue, so this is very low priority
    const colors = phenotypeToColors(phenotype);

    return (
        <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width={389} height={306} viewBox='0 0 389 306'>
            <SVGDefs id={id} headSize={headSize} eyeShape={eyeShape} />
            <g filter={`url(#head-shadow-${id})`}>
                <Ears earSet={earSet} rightColor={colors.rightEar} leftColor={colors.leftEar} />
                <Head headSize={headSize} color={colors.head} />
            </g>
            <g clipPath={`url(#head-${id})`}>
                <g clipPath={(point === 'point') ? `url(#point-${id})` : 'none'}>
                    {point === 'point' && <Point color={colors.point} />}
                    {tabby === 'tabby' && <Tabby color={colors.stripes} />}
                    {red === 'tortie' && <Tortie color={colors.tortie} />}
                    {(red === 'tortie' && tabby == 'tabby') &&
                    <g clipPath={`url(#tortie-${id})`}><Tabby color={colors.tortieStripes} /></g>
                    }
                    {white !== 'non-white' && <White white={white} color={colors.white} />}
                </g>
            </g>
            <Eyes id={id} eyeShape={eyeShape} color={colors.eyes} />
            <Muzzle id={id} muzzleLength={muzzleLength} muzzleColor={colors.muzzle} jawColor={colors.jaw} />
        </svg>
    );
};

export function renderCat(container) {
    const phenotype = {
        headSize: 2,
        eyeShape: 2,
        earSet: 2,
        muzzleLength: 2,
        red: 'non-red',
        dilute: 'non-dilute',
        tabby: 'non-tabby',
        point: 'non-point',
        white: 'non-white'
    };
    ReactDOM.render(<CatSVG phenotype={phenotype} {...phenotype} />, container);
}

export default CatSVG;