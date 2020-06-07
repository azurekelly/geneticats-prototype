import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import uniqid from 'uniqid';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
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
        if(parents[0] && parents[1]) {
            setChildren([
                {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)},
                {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)},
                {id: uniqid(), genotype: breed(parents[0].genotype, parents[1].genotype)}
            ]);
        }
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
                    <div id='breed-confirm' className={'big-btn' + (!(parents[0] && parents[1]) ? ' disabled' : '')} onClick={onBreed}>
                        <span>Breed</span>
                    </div>
                    <Parent parent={parents[1]} selected={targetSlot === 1} />
                    <div id='select-1' className='small-btn' onClick={() => dispatch(startSelectingParent(0))}><span>Select</span></div>
                    <div id='select-2' className='small-btn' onClick={() => dispatch(startSelectingParent(1))}><span>Select</span></div>
                </div>
                <div id='offspring'>
                    <Offspring child={children[0]} />
                    <Offspring child={children[1]} />
                    <Offspring child={children[2]} />
                    <div className={'small-btn keep-confirm' + (children[0] ? '' : ' disabled')} onClick={() => onKeep(children[0])}><span>Keep</span></div>
                    <div className={'small-btn keep-confirm' + (children[1] ? '' : ' disabled')} onClick={() => onKeep(children[1])}><span>Keep</span></div>
                    <div className={'small-btn keep-confirm' + (children[2] ? '' : ' disabled')} onClick={() => onKeep(children[2])}><span>Keep</span></div>
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