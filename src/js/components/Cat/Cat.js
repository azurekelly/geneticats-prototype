import React from 'react';
import ReactDOM from 'react-dom';
import CatSVG from './CatSVG';
import {genotypeToPhenotype} from '../../genetics';

const Cat = ({id, genotype}) => {
    const phenotype = genotypeToPhenotype(genotype);
    return <CatSVG id={id} genotype={genotype} phenotype={phenotype} />;
};

export function renderCat(id, genotype, container) {
    ReactDOM.render(<Cat id={id} genotype={genotype} />, container);
}

export default Cat;