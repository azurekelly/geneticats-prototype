import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import {catterySelector, depositCat} from '../redux/modules/catStore';
import {isSelectingSelector, targetParentSlotSelector, breedingParentsSelector, selectParent} from '../redux/modules/breeding';
import {routeSelector} from '../redux/modules/route';

const CatList = () => {
    const cats = useSelector(catterySelector);
    const route = useSelector(routeSelector);
    const isSelecting = useSelector(isSelectingSelector);
    const targetSlot = useSelector(targetParentSlotSelector);
    const parents = useSelector(breedingParentsSelector);
    const dispatch = useDispatch();

    const onCatClick = cat => {
        if(route === 'storage') {
            dispatch(depositCat(cat));
        }
        if(
            isSelecting &&
            (parents[0] === null || cat.id !== parents[0].id) &&
            (parents[1] === null || cat.id !== parents[1].id)
        ) {
            dispatch(selectParent(targetSlot, cat));
        }
    };

    return (<>
        <div id='cattery-header' className='header'><span>YOUR CATS</span></div>
        <div id='cattery' className={isSelecting ? 'selected' : ''}>
            {cats.map(({id, genotype}) => <Cat key={id} id={id} genotype={genotype} onClick={() => onCatClick({id, genotype})} />)}
        </div>
    </>);
};

export default CatList;