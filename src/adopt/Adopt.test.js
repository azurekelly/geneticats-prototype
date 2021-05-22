import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../app/rootReducer';
import Adopt from './Adopt';

const getComponent = (component, store = createStore(rootReducer)) => (
    <Provider store={store}>
        {component}
    </Provider>
);

it('renders without crashing', () => {
    render(getComponent(<Adopt />));
});
it('contains cats on mount', () => {
    const {getAllByTestId} = render(getComponent(<Adopt />));
    getAllByTestId(/cat-\d/);
});
it('changes cat on refresh', () => {
    const {getAllByTestId, getByTestId} = render(getComponent(<Adopt />));
    const cat = getAllByTestId(/cat-\d/)[0].id;

    fireEvent.click(getByTestId('refresh-btn'));
    expect(getAllByTestId(/cat-\d/)[0].id).not.toEqual(cat);
});
it('removes cat on adopt', () => {
    const {getByTestId, queryByTestId} = render(getComponent(<Adopt />));

    getByTestId('cat-1');
    fireEvent.click(getByTestId('keep-1'));
    expect(queryByTestId('cat-1')).toBeNull();
});
it('replaces adopted cat on refresh', () => {
    const {getByTestId, queryByTestId} = render(getComponent(<Adopt />));

    getByTestId('cat-1');
    fireEvent.click(getByTestId('keep-1'));
    expect(queryByTestId('cat-1')).toBeNull();
    fireEvent.click(getByTestId('refresh-btn'));
    getByTestId('cat-1');
});
it('changes location to home on back button click', () => {
    const store = createStore(rootReducer, {route: 'adopt'});
    const {getByTestId} = render(getComponent(<Adopt />, store));

    // checking the store directly is fine in this case, since it's essentially like checking url location
    expect(store.getState().route).toBe('adopt');
    fireEvent.click(getByTestId('back-btn'));
    expect(store.getState().route).toBe('home');
});