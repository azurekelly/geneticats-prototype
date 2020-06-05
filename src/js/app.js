/*global Snap, $*/
import '../spritesheet clean.svg';

import uniqid from 'uniqid';
import Cat from './Cat';
import {breed, randomGenotype} from './breeding';
import {newGoal, checkGoal} from './goal';
import {renderHome} from './components/Home';
import {renderGoal} from './components/GoalHeader';
import {addCat, despositToStorage, withdrawFromStorage} from './catList';
import {renderCattery, renderStorage} from './components/CatList';

let spriteSheet;
const canvas = Snap('#canvas');
const viewBox = '0 0 389 306';

Snap.load('spritesheet clean.svg', function(loadedFragment) {
    canvas.attr({'viewBox': viewBox});
    spriteSheet = loadedFragment;
    newGoal(spriteSheet, canvas);
    $('#storage-screen').hide();

    const $doc = $(document);

    renderHome($, Snap, spriteSheet, canvas, viewBox);
    renderGoal(0);

    $doc.on('click', '.select-confirm', function() {
        $('.cat-container.selected').removeClass('selected');

        const $this = $(this);

        $('#cattery').addClass('selected');
        $(".parent[data-id='" + $this.attr('data-id') + "']").addClass('selected');
    });

    $doc.on('click', '.keep-confirm', function() {
        const $this = $(this);
        if(!$this.is('.disabled')) {
            const $catContainer = $(".offspring[data-id='" + $this.attr('data-id') + "']");
            const $originalSvg = Snap($catContainer.find('svg').get(0));
            const targetGenotype = $originalSvg.select('.cat-head').attr('data-genotype');

            $this.addClass('disabled');

            $originalSvg.clear();
            addCat(uniqid(), targetGenotype);
            renderCattery();
        }
    });

    $doc.on('click', '#breed-confirm', function() {
        const $this = $(this);
        if(!($this.is('.disabled')) && ($('.parent.chosen').length === 2)) {
            const momGenotype = Snap('#parent1').select('.cat-head').attr('data-genotype');
            const dadGenotype = Snap('#parent2').select('.cat-head').attr('data-genotype');
            const child1 = Snap('#offspring1');
            const child2 = Snap('#offspring2');
            const child3 = Snap('#offspring3');

            child1.clear();
            child1.append(new Cat(breed(momGenotype, dadGenotype), spriteSheet, canvas).svg);
            child2.clear();
            child2.append(new Cat(breed(momGenotype, dadGenotype), spriteSheet, canvas).svg);
            child3.clear();
            child3.append(new Cat(breed(momGenotype, dadGenotype), spriteSheet, canvas).svg);
            $('.keep-confirm.disabled').removeClass('disabled');
        }
    });

    $doc.on('click', '#cattery .cat', function() {
        const $this = $(this);
        if($('#breed-screen').length > 0) {
            const $parent = $('.parent.selected');
            if($parent.length > 0) {
                if($this.is('.disabled')) {
                    if($this.attr('data-id') === $parent.attr('data-id')) {
                        $('.selected').removeClass('selected');
                    }
                }
                else {
                    const targetGenotype = Snap($this.get(0)).select('.cat-head').attr('data-genotype');
                    $(".cat.disabled[data-id='" + $parent.attr('data-id') + "']").removeClass('disabled').attr('data-id', '');
                    $this.addClass('disabled').attr('data-id', $parent.attr('data-id'));

                    const s = Snap('#parent' + $parent.attr('data-id'));
                    s.clear();
                    s.append(new Cat(targetGenotype, spriteSheet, canvas).svg);
                    $('.selected').removeClass('selected');
                }

                $parent.addClass('chosen');

                if($('.parent.chosen').length === 2) {
                    $('#breed-confirm').removeClass('disabled');
                }
            }
        }
        else if($('#storage-screen').is(':visible')) {
            const $originalSvg = Snap($this.get(0));
            const movedId = $originalSvg.select('.cat-head').attr('id');

            despositToStorage(movedId);
            renderCattery();
            renderStorage();
        }
    });

    $doc.on('click', '#storage-screen .cat', function() {
        const $originalSvg = Snap($(this).get(0));
        const movedId = $originalSvg.select('.cat-head').attr('id');

        withdrawFromStorage(movedId);
        renderCattery();
        renderStorage();
    });
});