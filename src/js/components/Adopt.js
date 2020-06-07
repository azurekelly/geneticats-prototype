import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
import SmallButton from './SmallButton';
import {adoptCat} from '../redux/modules/catStore';
import {goalSelector, completeGoal} from '../redux/modules/goal';
import {randomCat} from '../breeding';
import {phenotypesMatch, genotypeToPhenotype} from '../genetics';
import {alertWin} from '../utils';

const Adopt = () => {
    const goalCat = useSelector(goalSelector);
    const [cats, setCats] = useState(() => [
        randomCat(),
        randomCat(),
        randomCat()
    ]);
    const dispatch = useDispatch();

    const onRefresh = () => setCats([
        randomCat(),
        randomCat(),
        randomCat()
    ]);
    const onAdopt = newCat => {
        if(newCat.id) {
            setCats(cats.map(cat => ((cat === null || cat.id === newCat.id) ? null : cat)));
            dispatch(adoptCat(newCat));
            if(phenotypesMatch(genotypeToPhenotype(newCat.genotype), genotypeToPhenotype(goalCat.genotype))) {
                dispatch(completeGoal(randomCat()));
                alertWin();
            }
        }
    };

    return (
        <div id='adopt-screen'>
            <BackButton />
            <div id='refresh-btn' onClick={onRefresh}><span>🗘</span></div>
            {cats.map((cat, i) => (
                <div key={'slot' + i} className='cat-container'>
                    {cat && <Cat id={cat.id} genotype={cat.genotype} />}
                </div>
            ))}
            {cats.map((cat, i) => (
                <SmallButton key={'btn' + i} className='adopt-confirm' disabled={!cat} onClick={() => onAdopt(cat)}>Adopt</SmallButton>
            ))}
        </div>
    );
};

export default Adopt;