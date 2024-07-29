import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cat from '../shared-components/Cat/Cat';
import BackButton from '../shared-components/BackButton';
import SmallButton from '../shared-components/SmallButton';
import { adoptCat } from '../cattery/catteryState';
import { goalSelector, completeGoal } from '../goal/goalState';
import { debugSelector } from '../app/debugState';
import { randomCat, doPhenotypesMatch } from '../utils/genetics';
import { alertWin } from '../utils/utils';

const Adopt = () => {
  const goalCat = useSelector(goalSelector);
  const isDebugMode = useSelector(debugSelector);
  const [cats, setCats] = useState(() => [
    randomCat(),
    randomCat(),
    randomCat(),
  ]);
  const dispatch = useDispatch();

  const onRefresh = () => setCats([randomCat(), randomCat(), randomCat()]);
  const onAdopt = (newCat) => {
    if (newCat.id) {
      setCats(
        cats.map((cat) => (cat === null || cat.id === newCat.id ? null : cat)),
      );
      dispatch(adoptCat(newCat));
      if (doPhenotypesMatch(newCat, goalCat)) {
        dispatch(completeGoal(randomCat()));
        alertWin();
      }
    }
  };
  const handleDebugClick = (catIndex) => () => {
    const newGenotype = prompt('Enter new genotype');
    if (newGenotype !== null) {
      const newCats = [...cats];
      newCats[catIndex] = {
        ...newCats[catIndex],
        genotype: newGenotype,
      };
      setCats(newCats);
    }
  };

  return (
    <div id="adopt-screen">
      <BackButton data-testid="back-btn" />
      <div data-testid="refresh-btn" id="refresh-btn" onClick={onRefresh}>
        <span>🗘</span>
      </div>
      {cats.map((cat, i) => (
        <div key={'slot' + i} className="cat-container">
          {cat && (
            <Cat data-testid={'cat-' + i} id={cat.id} genotype={cat.genotype} />
          )}
        </div>
      ))}
      {cats.map((cat, i) => (
        <SmallButton
          data-testid={'keep-' + i}
          key={'btn' + i}
          className="adopt-confirm"
          disabled={!cat}
          onClick={() => onAdopt(cat)}
        >
          Adopt
        </SmallButton>
      ))}
      {isDebugMode &&
        cats.map((cat, i) => (
          <button onClick={handleDebugClick(i)} disabled={!cat} key={i}>
            Set genotype
          </button>
        ))}
    </div>
  );
};

export default Adopt;
