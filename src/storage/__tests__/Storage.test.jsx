import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../app/rootReducer';
import Storage from '../Storage';

const getComponent = (component, store = createStore(rootReducer)) => (
    <Provider store={store}>
        {component}
    </Provider>
);

it('renders without crashing', () => {
    render(getComponent(<Storage />));
});
it('renders stored cats', () => {
    const cats = [
        {id: 'c1', genotype: 0},
        {id: 'c2', genotype: 0},
        {id: 'c3', genotype: 0}
    ];
    const {getAllByTestId} = render(getComponent(<Storage />, createStore(rootReducer, {storage: cats})));
    const renderedCats = getAllByTestId('cat');
    expect(renderedCats.length).toBe(3);
});
it('removes cat on click', () => {
    const cats = [
        {id: 'c1', genotype: 0},
        {id: 'c2', genotype: 0},
        {id: 'c3', genotype: 0}
    ];
    const {container} = render(getComponent(<Storage />, createStore(rootReducer, {storage: cats})));
    const getCat = () => container.querySelector('#c2');

    expect(getCat()).not.toBeNull();
    fireEvent.click(getCat());
    expect(getCat()).toBeNull();
});
it('changes location to home on back button click', () => {
    const store = createStore(rootReducer, {route: 'storage'});
    const {getByTestId} = render(getComponent(<Storage />, store));

    // checking the store directly is fine in this case, since it's essentially like checking url location
    expect(store.getState().route).toBe('storage');
    fireEvent.click(getByTestId('back-btn'));
    expect(store.getState().route).toBe('home');
});