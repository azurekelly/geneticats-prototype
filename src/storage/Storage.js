import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from '../shared-components/Cat/Cat';
import BackButton from '../shared-components/BackButton';
import {storageSelector, withdrawCat} from './storageState';

const Storage = () => {
    const cats = useSelector(storageSelector);
    const dispatch = useDispatch();
    return (
        <div id='storage-screen'>
            <BackButton data-testid='back-btn' />
            {cats.map(({id, genotype}) => (
                <Cat data-testid='cat' key={id} id={id} genotype={genotype} onClick={() => dispatch(withdrawCat({id, genotype}))} />))
            }
        </div>
    );
};

export default Storage;