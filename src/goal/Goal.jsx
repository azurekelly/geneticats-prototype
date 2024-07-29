import Cat from '../shared-components/Cat/Cat';
import { useSelector } from 'react-redux';
import { scoreSelector, goalSelector } from './goalState';
import { debugSelector } from '../app/debugState';

const Goal = () => {
  const score = useSelector(scoreSelector);
  const goal = useSelector(goalSelector);
  const isDebugMode = useSelector(debugSelector);

  const openDebugPopup = () => {
    alert(`Goal genotype is: ${goal.genotype}`);
  };

  return (
    <>
      <div id="goal-header" className="header">
        <span>GOAL</span>
        <span id="score">{score}</span>
      </div>
      <div id="goal">
        <Cat id={goal.id} genotype={goal.genotype} />
        {isDebugMode && <button onClick={openDebugPopup}>Show genotype</button>}
      </div>
    </>
  );
};

export default Goal;
