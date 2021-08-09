import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import rootInitialState from './initial-state';
import { IState } from './interfaces';
import rootReducer from './reducer';

let store: Store<IState, AnyAction> | null = null;

const initStore = (state: IState = rootInitialState) => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: state,
    });
};

export const initializeStore = (state: IState = rootInitialState): Store<IState, AnyAction> => {
    let _store: Store<IState, AnyAction> = store ?? initStore(state);
    if (state && store) {
        _store = initStore({ ...store.getState(), ...state });
        store = null;
    }

    if (!process.env.browser) return _store;
    if (!store) store = _store;
    return _store;
};

export const useStore = (state: IState = rootInitialState): Store<IState, AnyAction> =>
    useMemo(() => initializeStore(state), [state]);
