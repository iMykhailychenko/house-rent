import { combineReducers } from '@reduxjs/toolkit';

import auth from './entities/auth/auth.reducer';
import { IState } from './interfaces';

const rootReducer = combineReducers<IState>({
    auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
