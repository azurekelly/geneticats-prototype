/*global Snap, $*/
import './spritesheet clean.svg';
import Cat from './Cat';
import {randomBetween} from './utils';

let spriteSheet;
const genomeLength = 13;
const canvas = Snap('#canvas');
const viewBox = '0 0 389 306';

function randomGenotype() {
    let genotype = 0;
    const genes = [0, 0, 1, 2, 3];
    for(let i = 0; i < 13; i++) {
        genotype <<= 2;
        genotype |= genes[randomBetween(0, 5)];
    }

    return genotype;
}

function breed(momGenes, dadGenes) {
    const momChromosome = randomChromosome(momGenes, genomeLength);
    const dadChromosome = randomChromosome(dadGenes, genomeLength) << 1;
    return momChromosome | dadChromosome;
}

//Currently unnecessary, but will become increasingly more useful as gene bit lengths increase
function pickRandomGene() {
    return randomBetween(1, 2);
}

function randomChromosome(genotype, genomeLength) {
    let result = 0;
    for(let i = 0; i < genomeLength; i++) {
        const shift = i * 2;
        const mask = pickRandomGene();
        let gene;

        //shift genotype to remove already processed genes and ensure the last 2 bits are always the gene that's being chosen for
        if(i > 0) {
            genotype = genotype >>> 2;
        }

        gene = genotype & mask;

        if(mask === 2) {
            gene = gene >>> 1;
        }

        gene = gene << shift;

        result = result | gene;
    }
    return result;
}


Snap.load('spritesheet clean.svg', function(loadedFragment) {
    canvas.attr({'viewBox': viewBox});
    spriteSheet = loadedFragment;
    newGoal();
    $('#storage-screen').hide();

    const $doc = $(document);

    $doc.on('click', '#breed-btn', function() {
        const $main = $('#main');
        const $breed = $('<div></div>').attr('id', 'breed-screen');
        const $containerBase = $('<div></div>').attr('class', 'cat-container');
        const $selectBase = $('<div></div>').attr('class', 'small-btn select-confirm').html('<span>Select</span>');
        const $keepBase = $('<div></div>').attr('class', 'small-btn keep-confirm disabled').html('<span>Keep</span>');
        const $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
        const $bigBtn = $('<div></div>').attr({'id': 'breed-confirm', 'class': 'big-btn disabled'}).html('<span>Breed</span>');

        $breed.append($('<div></div>').attr('id', 'back-btn').html('<span>◄</span>'));

        $breed.append(
            $("<div id='parents'></div>")
                .append($containerBase.clone().attr('data-id', '1').addClass('parent')
                    .append($svgBase.clone().attr('id', 'parent1')))
                .append($bigBtn)
                .append($containerBase.clone().attr('data-id', '2').addClass('parent')
                    .append($svgBase.clone().attr('id', 'parent2')))
                .append($selectBase.clone().attr({'data-id': '1', 'id': 'select-1'}))
                .append($selectBase.attr({'data-id': '2', 'id': 'select-2'}))
        );
        $breed.append(
            $("<div id='offspring'></div>")
                .append($containerBase.clone().attr('data-id', '1').addClass('offspring')
                    .append($svgBase.clone().attr('id', 'offspring1')))
                .append($containerBase.clone().attr('data-id', '2').addClass('offspring')
                    .append($svgBase.clone().attr('id', 'offspring2')))
                .append($containerBase.attr('data-id', '3').addClass('offspring')
                    .append($svgBase.attr('id', 'offspring3')))
                .append($keepBase.clone().attr({'data-id': '1', 'id': 'keep-1'}))
                .append($keepBase.clone().attr({'data-id': '2', 'id': 'keep-2'}))
                .append($keepBase.attr({'data-id': '3', 'id': 'keep-3'}))
        );


        $main.find('#home-screen').remove();
        $main.append($breed);
    });

    $doc.on('click', '#adopt-btn', function() {
        const $main = $('#main');
        const $adopt = $('<div></div>').attr('id', 'adopt-screen');
        const $containerBase = $('<div></div>').attr('class', 'cat-container');
        const $btnBase = $('<div></div>').attr('class', 'small-btn adopt-confirm').html('<span>Adopt</span>');
        const $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);

        $adopt.append($('<div></div>').attr('id', 'back-btn').html('<span>◄</span>'));
        $adopt.append($('<div></div>').attr('id', 'refresh-btn').html('<span>🗘</span>'));
        $adopt.append(
            $containerBase.clone()
                .attr('data-id', '1')
                .append($svgBase.clone().attr('id', 'adopt1'))
        );
        $adopt.append(
            $containerBase.clone()
                .attr('data-id', '2')
                .append($svgBase.clone().attr('id', 'adopt2'))
        );
        $adopt.append(
            $containerBase
                .attr('data-id', '3')
                .append($svgBase.clone().attr('id', 'adopt3'))
        );
        $adopt.append($btnBase.clone().attr('data-id', '1'));
        $adopt.append($btnBase.clone().attr('data-id', '2'));
        $adopt.append($btnBase.attr('data-id', '3'));

        $main.find('#home-screen').remove();
        $main.append($adopt);

        Snap('#adopt1').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
        Snap('#adopt2').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
        Snap('#adopt3').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
    });

    $doc.on('click', '#storage-btn', function() {
        $('#main').append($('<div></div>').attr('id', 'back-btn').html('<span>◄</span>'));
        $('#home-screen').remove();
        $('#storage-screen').show();
    });

    $doc.on('click', '#back-btn', function() {
        $('.cat.disabled').removeClass('disabled');
        $('.selected').removeClass('selected');
        $('#storage-screen').hide();
        const $main = $('#main');
        const $home = $('<div></div>').attr('id', 'home-screen');
        $home.append($('<div></div>').attr({'id': 'breed-btn', 'class': 'big-btn'}).html('<span>Breed</span>'));
        $home.append($('<div></div>').attr({'id': 'adopt-btn', 'class': 'big-btn'}).html('<span>Adopt</span>'));
        $home.append($('<div></div>').attr({'id': 'storage-btn', 'class': 'big-btn'}).html('<span>Storage</span>'));

        $('#breed-screen, #adopt-screen, #back-btn').remove();
        $('#storage-screen').hide();
        $main.append($home);
    });

    $doc.on('click', '#adopt-screen #refresh-btn', function() {
        const $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);

        $('.adopt-confirm.disabled').removeClass('disabled');

        $('#adopt-screen').find('.cat-container').each(function(i, e) {
            $(e).html('').append($svgBase.clone().attr('id', 'adopt' + (i + 1)));
        });

        Snap('#adopt1').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
        Snap('#adopt2').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
        Snap('#adopt3').append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
    });

    $doc.on('click', '.adopt-confirm', function() {
        const $this = $(this);
        if(!$this.is('.disabled')) {
            const $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
            const $catContainer = $(".cat-container[data-id='" + $this.attr('data-id') + "']");
            const $originalSvg = $catContainer.find('svg');
            const targetGenotype = Snap($originalSvg.get(0)).select('.cat-head').attr('data-genotype');

            $this.addClass('disabled');
            $catContainer.html('');
            $('#cattery').prepend($targetSvg);
            const svg = Snap($targetSvg.get(0));
            svg.append(new Cat(targetGenotype, spriteSheet, canvas).svg);
            checkGoal(svg);
        }
    });

    $doc.on('click', '.select-confirm', function() {
        $('.cat-container.selected').removeClass('selected');

        const $this = $(this);

        $('#cattery').addClass('selected');
        $(".parent[data-id='" + $this.attr('data-id') + "']").addClass('selected');
    });

    $doc.on('click', '.keep-confirm', function() {
        const $this = $(this);
        if(!$this.is('.disabled')) {
            const $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
            const $catContainer = $(".offspring[data-id='" + $this.attr('data-id') + "']");
            const $originalSvg = Snap($catContainer.find('svg').get(0));
            const targetGenotype = $originalSvg.select('.cat-head').attr('data-genotype');

            $this.addClass('disabled');

            $originalSvg.clear();
            $('#cattery').prepend($targetSvg);
            const svg = Snap($targetSvg.get(0));
            svg.append(new Cat(targetGenotype, spriteSheet, canvas).svg);
            checkGoal(svg);
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
            const $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
            const $originalSvg = Snap($this.get(0));
            const movedGenotype = $originalSvg.select('.cat-head').attr('data-genotype');

            $('#storage-screen').prepend($targetSvg);
            Snap($targetSvg.get(0)).append(new Cat(movedGenotype, spriteSheet, canvas).svg);
            $this.remove();
        }
    });

    $doc.on('click', '#storage-screen .cat', function() {
        const $this = $(this);
        const $targetSvg = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
        const $originalSvg = Snap($this.get(0));
        const movedGenotype = $originalSvg.select('.cat-head').attr('data-genotype');

        $('#cattery').prepend($targetSvg);
        Snap($targetSvg.get(0)).append(new Cat(movedGenotype, spriteSheet, canvas).svg);
        $this.remove();
    });
});

function checkGoal(svg) {
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

function newGoal() {
    const snap = Snap('#goal-cat');
    snap.clear();
    snap.append(new Cat(randomGenotype(), spriteSheet, canvas).svg);
}