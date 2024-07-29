import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cat from '../shared-components/Cat/Cat';
import BackButton from '../shared-components/BackButton';
import SmallButton from '../shared-components/SmallButton';
import BigButton from '../shared-components/BigButton';
import {
  startSelectingParent,
  breedingParentsSelector,
  targetParentSlotSelector,
} from './breedState';
import { adoptCat } from '../cattery/catteryState';
import { goalSelector, completeGoal } from '../goal/goalState';
import { debugSelector } from '../app/debugState';
import {
  doPhenotypesMatch,
  randomOffspring,
  randomCat,
} from '../utils/genetics';
import { alertWin } from '../utils/utils';

const Breed = () => {
  const [children, setChildren] = useState([null, null, null]);
  const parents = useSelector(breedingParentsSelector);
  const targetSlot = useSelector(targetParentSlotSelector);
  const goalCat = useSelector(goalSelector);
  const isDebugMode = useSelector(debugSelector);
  const dispatch = useDispatch();

  const onBreed = () => {
    setChildren([
      randomOffspring(parents[0], parents[1]),
      randomOffspring(parents[0], parents[1]),
      randomOffspring(parents[0], parents[1]),
    ]);
  };
  const onKeep = (newCat) => {
    if (newCat) {
      setChildren(
        children.map((cat) =>
          cat === null || cat.id === newCat.id ? null : cat,
        ),
      );
      dispatch(adoptCat(newCat));
      if (doPhenotypesMatch(newCat, goalCat)) {
        dispatch(completeGoal(randomCat()));
        alertWin();
      }
    }
  };
  const handleDebugClick = (offspringIndex) => () => {
    const newGenotype = prompt('Enter new genotype');
    if (newGenotype !== null) {
      const newChildren = [...children];
      newChildren[offspringIndex] = {
        ...newChildren[offspringIndex],
        genotype: newGenotype,
      };
      setChildren(newChildren);
    }
  };

  return (
    <>
      <div id="breed-screen">
        <BackButton />
        <div id="parents">
          <Parent parent={parents[0]} selected={targetSlot === 0} />
          <BigButton
            id="breed-confirm"
            disabled={!(parents[0] && parents[1])}
            onClick={onBreed}
          >
            Breed
          </BigButton>
          <Parent parent={parents[1]} selected={targetSlot === 1} />
          <SmallButton
            id="select-1"
            onClick={() => dispatch(startSelectingParent(0))}
          >
            Select
          </SmallButton>
          <SmallButton
            id="select-2"
            onClick={() => dispatch(startSelectingParent(1))}
          >
            Select
          </SmallButton>
        </div>
        <div id="offspring">
          {children.map((child, i) => (
            <Offspring key={'offspring-' + i} child={child} />
          ))}
          {children.map((child, i) => (
            <SmallButton
              key={'btn-' + i}
              disabled={child === null}
              onClick={() => onKeep(child)}
            >
              Keep
            </SmallButton>
          ))}
          {isDebugMode &&
            children.map((child, i) => (
              <button
                onClick={handleDebugClick(i)}
                disabled={child === null}
                key={i}
              >
                Set genotype
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

const Parent = ({ parent, selected }) => (
  <div className={'cat-container parent' + (selected ? ' selected' : '')}>
    {parent && <Cat id={parent.id} genotype={parent.genotype} />}
  </div>
);

const Offspring = ({ child }) => (
  <div className="cat-container">
    {child && <Cat id={child.id} genotype={child.genotype} />}
  </div>
);

export default Breed;
