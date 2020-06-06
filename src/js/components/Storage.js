import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
import {storageSelector, withdrawCat} from '../redux/modules/catStore';

const Storage = () => {
    const cats = useSelector(storageSelector);
    const dispatch = useDispatch();
    return (
        <div id='storage-screen'>
            <BackButton />
            {cats.map(({id, genotype}) => (
                <Cat key={id} id={id} genotype={genotype} onClick={() => dispatch(withdrawCat({id, genotype}))} />))
            }
        </div>
    );
};

export default Storage;