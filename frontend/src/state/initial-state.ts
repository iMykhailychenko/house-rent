import authInitialState from './entities/auth/auth.initial-state';
import { IState } from './interfaces';

const rootInitialState: IState = {
    auth: authInitialState,
};

export default rootInitialState;
