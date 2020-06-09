import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from '../shared-components/Cat/Cat';
import {catterySelector} from './catteryState';
import {depositCat} from '../storage/storageState';
import {isSelectingSelector, breedingParentsSelector, selectParent} from '../breed/breedState';
import {routeSelector} from '../app/routeState';

const CatList = () => {
    const cats = useSelector(catterySelector);
    const route = useSelector(routeSelector);
    const isSelecting = useSelector(isSelectingSelector);
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
            dispatch(selectParent(cat));
        }
    };

    return (<>
        <div id='cattery-header' className='header'><span>YOUR CATS</span></div>
        <div id='cattery' className={isSelecting ? 'selected' : ''}>
            {cats.map(({id, genotype}) => (
                <Cat
                    key={id}
                    id={id}
                    genotype={genotype}
                    disabled={(parents[0] && id === parents[0].id) || (parents[1] && id === parents[1].id)}
                    onClick={() => onCatClick({id, genotype})}
                />
            ))}
        </div>
    </>);
};

export default CatList;