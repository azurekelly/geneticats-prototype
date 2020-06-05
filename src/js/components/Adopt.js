import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import uniqid from 'uniqid';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
import {adoptCat} from '../redux/modules/catStore';
import {changeRoute} from '../redux/modules/route';
import {randomGenotype} from '../breeding';

const Adopt = () => {
    const [cats, setCats] = useState(() => [
        {id: uniqid(), genotype: randomGenotype()},
        {id: uniqid(), genotype: randomGenotype()},
        {id: uniqid(), genotype: randomGenotype()}
    ]);
    const dispatch = useDispatch();

    const onRefresh = () => setCats([
        {id: uniqid(), genotype: randomGenotype()},
        {id: uniqid(), genotype: randomGenotype()},
        {id: uniqid(), genotype: randomGenotype()}
    ]);
    const onAdopt = newCat => {
        if(newCat.id) {
            setCats(cats.map(cat => ((cat.id == newCat.id) ? {id: null, genotype: null} : cat)));
            dispatch(adoptCat(newCat));
        }
    };

    return (
        <div id='adopt-screen'>
            <BackButton onClick={() => dispatch(changeRoute('home'))} />
            <div id='refresh-btn' onClick={onRefresh}><span>🗘</span></div>
            {cats.map((cat, i) => <AdoptSlot key={'slot' + i} id={cat.id} genotype={cat.genotype} />)}
            {cats.map((cat, i) => <AdoptButton key={'btn' + i} disabled={!cat.id} onClick={() => onAdopt(cat)} />)}
        </div>
    );
};

const AdoptSlot = ({id, genotype}) => (
    <div className='cat-container'>
        {id && <Cat id={id} genotype={genotype} />}
    </div>
);

const AdoptButton = ({disabled, onClick}) => (
    <div className={'small-btn adopt-confirm' + (disabled ? ' disabled' : '')} onClick={onClick}><span>Adopt</span></div>
);

export default Adopt;