import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './Cat/Cat';
import {catteryList} from '../catList';

const CatList = ({cats}) => (
    <>
        {cats.map(({id, genotype}) => <Cat key={id} id={id} genotype={genotype}/>)}
    </>
);

export const renderCattery = () => ReactDOM.render(<CatList cats={catteryList} />, document.getElementById('cattery'));

export default CatList;