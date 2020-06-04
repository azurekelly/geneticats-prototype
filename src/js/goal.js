import {randomGenotype} from './breeding';
import {genotypeToPhenotype, phenotypesMatch} from './genetics';
import {renderGoal} from './components/GoalHeader';
import {renderCat} from './components/Cat/Cat';

let score = 0;
let goal;

export function checkGoal(newGenotype) {
    const newPhenotype = genotypeToPhenotype(newGenotype);
    const goalPhenotype = genotypeToPhenotype(goal);

    if(phenotypesMatch(newPhenotype, goalPhenotype)) {
        score += 50;
        renderGoal(score);
        newGoal();
        alert('You obtained the goal cat! A new goal has been added.');
    }
}

export function newGoal() {
    goal = randomGenotype();
    renderCat(goal, document.getElementById('goal'));
}