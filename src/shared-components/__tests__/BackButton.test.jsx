import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../app/rootReducer';
import BackButton from '../BackButton';
import {changeToHome} from '../../app/routeState';

const getComponent = (component, store = createStore(rootReducer)) => (
    <Provider store={store}>
        {component}
    </Provider>
);

it('renders without crashing', () => {
    render(getComponent(<BackButton />));
});
it('dispatches changeToHome action on click', () => {
    const mockStore = createStore(rootReducer, {});
    mockStore.dispatch = jest.fn();
    const {getByTestId} = render(getComponent(<BackButton data-testid='back-btn' />, mockStore));
    fireEvent.click(getByTestId('back-btn'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(changeToHome());
});