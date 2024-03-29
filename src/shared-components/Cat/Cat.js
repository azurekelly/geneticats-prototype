import React from 'react';
import ReactDOM from 'react-dom';
import Ears from './pieces/Ears';
import Head from './pieces/Head';
import Muzzle from './pieces/Muzzle';
import Eyes from './pieces/Eyes';
import Point from './markings/Point';
import Tabby from './markings/Tabby';
import Tortie from './markings/Tortie';
import White from './markings/White';
import SVGDefs from './SVGDefs';
import {genotypeToPhenotype, phenotypeToColors} from '../../utils/genetics';

const Cat = ({id, genotype, disabled, onClick, ...props}) => {
    // TODO convert phenotype and colors to state that never gets changed, just to avoid them be recalculated each render
    const phenotype = genotypeToPhenotype(genotype);
    const colors = phenotypeToColors(phenotype);
    const {headSize, eyeShape, earSet, muzzleLength, red, tabby, point, white} = phenotype;

    return (
        <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width={389} height={306} viewBox='0 0 389 306'
            id={id} className={'cat' + (disabled ? ' disabled' : '')} onClick={disabled ? undefined : onClick} {...props}>
            <SVGDefs id={id} headSize={headSize} eyeShape={eyeShape} torbie={red === 'tortie' && tabby === 'tabby'} point={point === 'point'} />
            <g filter={`url(#head-shadow-${id})`}>
                <Ears id={id} earSet={earSet} rightColor={colors.rightEar} leftColor={colors.leftEar} />
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
                </g>
                {white !== 'non-white' && <White white={white} color={colors.white} />}
            </g>
            <Eyes id={id} eyeShape={eyeShape} color={colors.eyes} />
            <Muzzle id={id} muzzleLength={muzzleLength} muzzleColor={colors.muzzle} jawColor={colors.jaw} />
        </svg>
    );
};

export function renderCat(id, genotype, container) {
    ReactDOM.render(<Cat id={id} genotype={genotype} />, container);
}

export default Cat;