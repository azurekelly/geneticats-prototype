import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import {depositCat} from '../redux/modules/catStore';

const CatList = () => {
    const cats = useSelector(state => state.catStore.cattery);
    const route = useSelector(state => state.route);
    const dispatch = useDispatch();

    const onCatClick = cat => {
        if(route === 'storage') {
            dispatch(depositCat(cat));
        }
    };

    return (<>
        <div id='cattery-header' className='header'><span>YOUR CATS</span></div>
        <div id='cattery'>
            {cats.map(({id, genotype}) => <Cat key={id} id={id} genotype={genotype} onClick={() => onCatClick({id, genotype})} />)}
        </div>
    </>);
};

export default CatList;