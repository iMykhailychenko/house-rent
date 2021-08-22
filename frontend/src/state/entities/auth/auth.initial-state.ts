import { IAuthInitialState } from './auth.interface';

const authInitialState: IAuthInitialState = {
    accessToken: null,
    loginStatus: 'idle',
    joinStatus: 'idle',
};

export default authInitialState;
