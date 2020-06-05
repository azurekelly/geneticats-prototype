import React from 'react';
import ReactDOM from 'react-dom';
import uniqid from 'uniqid';
import Cat from './Cat/Cat';
import {randomGenotype} from '../breeding';
import {addCat} from '../catList';
import {renderCattery} from './CatList';
import BackButton from './BackButton';

class Adopt extends React.Component {
    constructor() {
        super();
        this.state = {
            cats: [
                {id: uniqid(), genotype: randomGenotype()},
                {id: uniqid(), genotype: randomGenotype()},
                {id: uniqid(), genotype: randomGenotype()}
            ]
        };
    }

    refreshCats = () => {
        this.setState({
            cats: [
                {id: uniqid(), genotype: randomGenotype()},
                {id: uniqid(), genotype: randomGenotype()},
                {id: uniqid(), genotype: randomGenotype()}
            ]
        });
    }

    adoptCat = cat => {
        if(cat.id) {
            addCat(cat.id, cat.genotype);
            renderCattery();
            this.setState(prevState => ({cats: prevState.cats.map(x => ((x.id == cat.id) ? {id: '', genotype: ''} : x))}));
        }
    }

    render() {
        return (
            <>
                <BackButton onClick={() => {
                    unmountAdopt();
                    this.props.onBackClick();
                }} />
                <div id='refresh-btn' onClick={this.refreshCats}><span>🗘</span></div>
                {this.state.cats.map(cat => <AdoptSlot id={cat.id} genotype={cat.genotype} />)}
                {this.state.cats.map(cat => <AdoptButton disabled={!cat.id} onClick={() => this.adoptCat(cat)} />)}
            </>
        );
    }
}

const AdoptSlot = ({id, genotype}) => (
    <div className='cat-container'>
        {id && <Cat id={id} genotype={genotype} />}
    </div>
);

const AdoptButton = ({disabled, onClick}) => (
    <div className={'small-btn adopt-confirm' + (disabled ? ' disabled' : '')} onClick={onClick}><span>Adopt</span></div>
);

export function renderAdopt(onBackClick) {
    ReactDOM.render(<Adopt onBackClick={onBackClick} />, document.getElementById('adopt-screen'));
}

function unmountAdopt() {
    ReactDOM.unmountComponentAtNode(document.getElementById('adopt-screen'));
}

export default AdoptSlot;