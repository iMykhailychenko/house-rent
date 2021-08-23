import { configureStore, Store } from '@reduxjs/toolkit';

import rootInitialState from './initial-state';
import rootReducer, { RootState } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let store: Store<RootState, any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initStore = (state: RootState = rootInitialState): Store<RootState, any> => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: state,
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initializeStore = (state: RootState = rootInitialState): Store<RootState, any> => {
    let _store = store ?? initStore(state);
    if (state && store) {
        _store = initStore({ ...store.getState(), ...state });
        store = null;
    }

    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;
    return _store;
};
