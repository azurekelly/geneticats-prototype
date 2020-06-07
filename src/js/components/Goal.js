import React from 'react';
import Cat from './Cat/Cat';
import {useSelector} from 'react-redux';
import {scoreSelector, goalSelector} from '../redux/modules/goal';

const Goal = () => {
    const score = useSelector(scoreSelector);
    const goal = useSelector(goalSelector);
    return (<>
        <div id='goal-header' className='header'>
            <span>GOAL</span>
            <span id='score'>{score}</span>
        </div>
        <div id='goal'>
            <Cat id={goal.id} genotype={goal.genotype} />
        </div>
    </>);
};

export default Goal;