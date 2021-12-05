import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from './reducer';

export const hydrate = createAction<RootState>(HYDRATE);
