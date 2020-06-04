import React from 'react';
import ReactDOM from 'react-dom';

const GoalHeader = ({score}) => (
    <>
        <span>GOAL</span>
        <span id='score'>{score}</span>
    </>
);

export function renderGoal(score) {
    ReactDOM.render(<GoalHeader score={score} />, document.getElementById('goal-header'));
}

export default GoalHeader;