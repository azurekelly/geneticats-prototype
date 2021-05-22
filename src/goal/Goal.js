import React from 'react';
import Cat from '../shared-components/Cat/Cat';
import {useSelector} from 'react-redux';
import {scoreSelector, goalSelector} from './goalState';

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