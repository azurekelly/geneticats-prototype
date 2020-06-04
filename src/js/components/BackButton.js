import React from 'react';
import ReactDOM from 'react-dom';

const BackButton = ({onClick}) => (
    <div id='back-btn' onClick={onClick}><span>◄</span></div>
);

export function renderBack($, renderHome) {
    console.log('rendering back button');
    ReactDOM.render(<><BackButton onClick={backOnClick} /></>, document.getElementById('back-btn-container'));

    // nested function to avoid having to pass Home component parameters to back button for now
    function backOnClick() {
        $('.cat.disabled').removeClass('disabled');
        $('.selected').removeClass('selected');
        $('#storage-screen').hide();
        const $main = $('#main');
        const $home = $('<div></div>').attr('id', 'home-screen');

        $('#breed-screen, #adopt-screen').remove();
        removeBack();
        $main.append($home);
        renderHome();
    }
}

export function removeBack() {
    ReactDOM.unmountComponentAtNode(document.getElementById('back-btn-container'));
}

export default BackButton;