import authInitialState from './entities/auth/auth.initial-state';
import filtersInitialState from './entities/filters/filters.initial-state';
import { IState } from './interfaces';

const rootInitialState: IState = {
    auth: authInitialState,
    filters: filtersInitialState,
};

export default rootInitialState;
