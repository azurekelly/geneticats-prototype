import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import {catterySelector, depositCat} from '../redux/modules/catStore';
import {routeSelector} from '../redux/modules/route'

const CatList = () => {
    const cats = useSelector(catterySelector);
    const route = useSelector(routeSelector);
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