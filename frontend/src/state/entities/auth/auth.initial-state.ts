import { IAuthInitialState } from './auth.interface';

const authInitialState: IAuthInitialState = {
    accessToken: null,
    status: 'idle',
};

export default authInitialState;
