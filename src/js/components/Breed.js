import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import uniqid from 'uniqid';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
import SmallButton from './SmallButton';
import BigButton from './BigButton';
import {startSelectingParent, breedingParentsSelector, targetParentSlotSelector} from '../redux/modules/breeding';
import {adoptCat} from '../redux/modules/catStore';
import {goalSelector, completeGoal} from '../redux/modules/goal';
import {breed, randomGenotype} from '../breeding';
import {genotypeToPhenotype, phenotypesMatch} from '../genetics';
import {alertWin} from '../utils';

const Breed = () => {
    const [children, setChildren] = useState([null, null, null]);
    const parents = useSelector(breedingParentsSelector);
    const targetSlot = useSelector(targetParentSlotSelector);
    const goalCat = useSelector(goalSelector);
    const dispatch = useDispatch();

    const onBreed = () => {
        setChildren([
            {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)},
            {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)},
            {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)}
        ]);
    };
    const onKeep = newCat => {
        if(newCat) {
            setChildren(children.map(cat => (cat === null || cat.id === newCat.id ? null : cat)));
            dispatch(adoptCat(newCat));
            if(phenotypesMatch(genotypeToPhenotype(newCat.genotype), genotypeToPhenotype(goalCat.genotype))) {
                dispatch(completeGoal({id: uniqid(), genotype: randomGenotype()}));
                alertWin();
            }
        }
    };

    return (
        <>
            <div id='breed-screen'>
                <BackButton />
                <div id='parents'>
                    <Parent parent={parents[0]} selected={targetSlot === 0} />
                    <BigButton id='breed-confirm' disabled={!(parents[0] && parents[1])} onClick={onBreed}>Breed</BigButton>
                    <Parent parent={parents[1]} selected={targetSlot === 1} />
                    <SmallButton id='select-1' onClick={() => dispatch(startSelectingParent(0))}>Select</SmallButton>
                    <SmallButton id='select-2' onClick={() => dispatch(startSelectingParent(1))}>Select</SmallButton>
                </div>
                <div id='offspring'>
                    {children.map(child => <Offspring child={child} />)}
                    {children.map(child => <SmallButton disabled={child === null} onClick={() => onKeep(child)}>Keep</SmallButton>)}
                </div>
            </div>
        </>
    );
};

const Parent = ({parent, selected}) => (
    <div className={'cat-container parent' + (selected ? ' selected' : '')}>
        {parent && <Cat id={parent.id} genotype={parent.genotype} />}
    </div>
);

const Offspring = ({child}) => (
    <div className='cat-container'>
        {child && <Cat id={child.id} genotype={child.genotype} />}
    </div>
);

export default Breed;