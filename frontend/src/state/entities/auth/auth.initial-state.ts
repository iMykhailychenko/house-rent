import { IAuthState } from './auth.interface';

const authInitialState: IAuthState = {
    accessToken: null,
    loginStatus: 'idle',
    joinStatus: 'idle',
};

export default authInitialState;
