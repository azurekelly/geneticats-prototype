/*global Snap, $*/
import Cat from './Cat';
import {randomGenotype} from './breeding';

export function checkGoal(svg) {
    let matches = false;
    const goalCat = Snap('#goal');

    if((svg.select('.tabby') !== null && goalCat.select('.tabby') !== null) ||
            (svg.select('.tabby') === null && goalCat.select('.tabby') === null)) {
        if((svg.select('.tortie') !== null && goalCat.select('.tortie') !== null) ||
                (svg.select('.tortie') === null && goalCat.select('.tortie') === null)) {
            if((svg.select('.point') !== null && goalCat.select('.point') !== null) ||
                    (svg.select('.point') === null && goalCat.select('.point') === null)) {
                if((svg.select('.lowwhite') !== null && goalCat.select('.lowwhite') !== null) ||
                        (svg.select('.lowwhite') === null && goalCat.select('.lowwhite') === null)) {
                    if((svg.select('.highwhite') !== null && goalCat.select('.highwhite') !== null) ||
                            (svg.select('.highwhite') === null && goalCat.select('.highwhite') === null)) {
                        const earMatch = svg.select('.ears').attr('class') === goalCat.select('.ears').attr('class');
                        const headMatch = svg.select('.head').attr('class') === goalCat.select('.head').attr('class');
                        const muzzleMatch = svg.select('.muzzle').attr('class') === goalCat.select('.muzzle').attr('class');
                        const eyeMatch = svg.select('.eyes').attr('class') === goalCat.select('.eyes').attr('class');

                        matches = earMatch && headMatch && muzzleMatch && eyeMatch;
                    }
                }
            }
        }
    }

    if(matches) {
        const $score = $('#score');
        $score.text(parseInt($score.text()) + 50);
        newGoal();
        alert('You obtained the goal cat! A new goal has been added.');
    }
}

export function newGoal(spriteSheet, canvas) {
    const snap = Snap('#goal-cat');
    snap.clear();
    snap.append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
}