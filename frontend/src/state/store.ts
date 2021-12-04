import { configureStore, Store } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootInitialState from './initial-state';
import rootReducer, { RootState } from './reducer';

export type AppStore = Store<RootState, any>;

const makeStore = (): AppStore =>
    configureStore({
        preloadedState: rootInitialState,
        reducer: rootReducer,
        devTools: true,
    });

export const wrapper = createWrapper<AppStore>(makeStore);
