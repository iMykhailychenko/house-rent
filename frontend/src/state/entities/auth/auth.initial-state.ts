import { IAuthState } from './auth.interface';

const authInitialState: IAuthState = {
    loginStatus: 'idle',
    joinStatus: 'idle',
};

export default authInitialState;
