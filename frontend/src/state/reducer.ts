import { combineReducers } from '@reduxjs/toolkit';

import auth from './entities/auth/auth.reducer';
import filters from './entities/filters/filters.reducer';
import { IState } from './interfaces';

const rootReducer = combineReducers<IState>({
    auth,
    filters,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
