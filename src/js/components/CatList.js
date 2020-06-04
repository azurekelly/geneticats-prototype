import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './Cat/Cat';
import {catteryList, storageList} from '../catList';

const CatList = ({cats}) => (
    <>
        {cats.map(({id, genotype}) => <Cat id={id} genotype={genotype}/>)}
    </>
);

export const renderCattery = () => ReactDOM.render(<CatList cats={catteryList} />, document.getElementById('cattery'));

export const renderStorage = () => ReactDOM.render(<CatList cats={storageList} />, document.getElementById('cattery'));

export default CatList;