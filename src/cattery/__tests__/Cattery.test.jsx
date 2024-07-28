import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../app/rootReducer';
import Cattery from '../Cattery';

const getComponent = (component, store = createStore(rootReducer)) => (
    <Provider store={store}>
        {component}
    </Provider>
);

it('renders without crashing', () => {
    render(getComponent(<Cattery />));
});
it('renders a list of cats', () => {
    const store = createStore(rootReducer, {
        cattery: [
            {id: 'c1', genotype: 0},
            {id: 'c2', genotype: 0},
            {id: 'c3', genotype: 0}
        ]
    });
    const {getAllByTestId} = render(getComponent(<Cattery />, store));
    expect(getAllByTestId(/cat-\d+/).length).toBe(3);
});
it('renders no cats for empty list', () => {
    const store = createStore(rootReducer, {cattery: []});
    const {queryByTestId} = render(getComponent(<Cattery />, store));
    expect(queryByTestId(/cat-\d+/)).toBeNull();
});