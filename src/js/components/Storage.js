import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './Cat/Cat';

const Storage = ({catList}) => (
    <>
        {catList.map(({id, genotype}) => <Cat id={id} genotype={genotype}/>)}
    </>
);

export const renderStorage =
    catList => ReactDOM.render(<Storage catList={catList} />, document.getElementById('storage-screen'));

export default Storage;