import React from 'react';
import ReactDOM from 'react-dom';
import CatSVG from './CatSVG';
import {genotypeToPhenotype} from '../../genetics';

const Cat = ({genotype}) => {
    const phenotype = genotypeToPhenotype(genotype);
    return <CatSVG phenotype={phenotype} genotype={genotype} {...phenotype} />;
};

export function renderCat(genotype, container) {
    ReactDOM.render(<Cat genotype={genotype} />, container);
}

export default Cat;