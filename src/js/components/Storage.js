import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './Cat/Cat';
import {renderCattery} from './CatList';
import {withdrawFromStorage, storageList} from '../catList';
import BackButton from './BackButton';

const Storage = ({cats, onBackClick}) => (
    <>
        <BackButton onClick={() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('storage-screen'));
            onBackClick();
        }} />
        {cats.map(({id, genotype}) => (
            <Cat key={id} id={id} genotype={genotype} onClick={() => {
                withdrawFromStorage(id);
                renderStorage();
                renderCattery();
            }} />))
        }
    </>
);

export function renderStorage(onBackClick) {
    ReactDOM.render(<Storage cats={storageList} onBackClick={onBackClick} />, document.getElementById('storage-screen'));
}
export default Storage;