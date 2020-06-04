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
import {genotypeToPhenotype, phenotypeToColors} from '../../genetics';

const Cat = ({id, genotype}) => {
    const phenotype = genotypeToPhenotype(genotype);
    const colors = phenotypeToColors(phenotype);
    const {headSize, eyeShape, earSet, muzzleLength, red, tabby, point, white} = phenotype;

    return (
        <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width={389} height={306} viewBox='0 0 389 306' className='cat'>
            <SVGDefs id={id} headSize={headSize} eyeShape={eyeShape} />

            {/* this g element is temporary, just used for the remaining jQuery parts of the codebase */}
            <g className='cat-head' id={id} data-genotype={genotype}>
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
                    </g>
                    {white !== 'non-white' && <White white={white} color={colors.white} />}
                </g>
                <Eyes id={id} eyeShape={eyeShape} color={colors.eyes} />
                <Muzzle id={id} muzzleLength={muzzleLength} muzzleColor={colors.muzzle} jawColor={colors.jaw} />
            </g>
        </svg>
    );
};

export function renderCat(id, genotype, container) {
    ReactDOM.render(<Cat id={id} genotype={genotype} />, container);
}

export default Cat;