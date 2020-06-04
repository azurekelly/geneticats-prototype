import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './Cat/Cat';

const Cattery = ({catList}) => (
    <>
        {catList.map(({id, genotype}) => <Cat id={id} genotype={genotype}/>)}
    </>
);

export const renderCattery =
    catList => ReactDOM.render(<Cattery catList={catList} />, document.getElementById('cattery'));

export default Cattery;