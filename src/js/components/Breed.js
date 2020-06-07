import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cat from './Cat/Cat';
import BackButton from './BackButton';
import {startSelectingParent, breedingParentsSelector, targetParentSlotSelector} from '../redux/modules/breeding';

const Breed = () => {
    const parents = useSelector(breedingParentsSelector);
    const targetSlot = useSelector(targetParentSlotSelector);
    const dispatch = useDispatch();

    return (
        <>
            <div id='breed-screen'>
                <BackButton />
                <div id='parents'>
                    <div className={'cat-container parent' + (targetSlot === 0 ? ' selected' : '')}>
                        {parents[0] && <Cat id={parents[0].id} genotype={parents[0].genotype} />}
                    </div>
                    <div id='breed-confirm' className={'big-btn' + (!(parents[0] && parents[1]) ? ' disabled' : '')}>
                        <span>Breed</span>
                    </div>
                    <div className={'cat-container parent' + (targetSlot === 1 ? ' selected' : '')}>
                        {parents[1] && <Cat id={parents[1].id} genotype={parents[1].genotype} />}
                    </div>
                    <div id='select-1' className='small-btn' onClick={() => dispatch(startSelectingParent(0))}><span>Select</span></div>
                    <div id='select-2' className='small-btn' onClick={() => dispatch(startSelectingParent(1))}><span>Select</span></div>
                </div>
                <div id='offspring'>
                    <div className='cat-container'></div>
                    <div className='cat-container'></div>
                    <div className='cat-container'></div>
                    <div className='small-btn keep-confirm'><span>Keep</span></div>
                    <div className='small-btn keep-confirm'><span>Keep</span></div>
                    <div className='small-btn keep-confirm'><span>Keep</span></div>
                </div>
            </div>
        </>
    );
};

export default Breed;