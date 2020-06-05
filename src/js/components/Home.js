import React from 'react';
import ReactDOM from 'react-dom';
import BigButton from './BigButton';
import {renderBack, backOnClick} from './BackButton';
import {renderAdopt} from './Adopt';
import {renderStorage} from './Storage';

class Home extends React.Component {
    constructor({$, snap, spriteSheet, canvas, viewBox}) {
        super();
        this.state = {$, snap, spriteSheet, canvas, viewBox};
        console.log(this.state);
    }

    breedOnClick = () => {
        const {$, snap, spriteSheet, canvas, viewBox} = this.state;
        const $main = $('#main');
        const $breed = $('<div></div>').attr('id', 'breed-screen');
        const $containerBase = $('<div></div>').attr('class', 'cat-container');
        const $selectBase = $('<div></div>').attr('class', 'small-btn select-confirm').html('<span>Select</span>');
        const $keepBase = $('<div></div>').attr('class', 'small-btn keep-confirm disabled').html('<span>Keep</span>');
        const $svgBase = $("<svg class='cat' height='200' width='250'></svg>").attr('viewBox', viewBox);
        const $bigBtn = $('<div></div>').attr({'id': 'breed-confirm', 'class': 'big-btn disabled'}).html('<span>Breed</span>');

        renderBack(
            $,
            () => renderHome($, snap, spriteSheet, canvas, viewBox)
        );

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
    }

    storageOnClick = () => {
        const {$, snap, spriteSheet, canvas, viewBox} = this.state;
        $('#home-screen').remove();
        $('#storage-screen').show();
        renderStorage(() => backOnClick($, () => renderHome($, snap, spriteSheet, canvas, viewBox)));
    }

    adoptOnClick = () => {
        const {$, snap, spriteSheet, canvas, viewBox} = this.state;
        const $main = $('#main');
        const $adopt = $('<div></div>').attr('id', 'adopt-screen');
        $main.find('#home-screen').remove();
        $main.append($adopt);

        renderAdopt(() => backOnClick($, () => renderHome($, snap, spriteSheet, canvas, viewBox)));
    }

    render() {
        return (<>
            <BigButton onClick={this.breedOnClick}>Breed</BigButton>
            <BigButton onClick={this.adoptOnClick}>Adopt</BigButton>
            <BigButton onClick={this.storageOnClick}>Storage</BigButton>
        </>);
    }
}

export function renderHome($, Snap, spriteSheet, canvas, viewBox) {
    ReactDOM.render(
        <Home $={$} snap={Snap} spriteSheet={spriteSheet} canvas={canvas} viewBox={viewBox}/>,
        document.getElementById('home-screen')
    );
}

export default Home;