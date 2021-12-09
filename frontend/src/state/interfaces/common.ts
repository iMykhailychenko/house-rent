import { ThunkAppDispatch } from '../../hooks/redux.hook';

import { IState } from './root';

export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export type ErrorState = { status?: number; message: string } | null;

export type CommonState<T> = { status: LoadingStatus; error: ErrorState; data: T };

export type AsyncThunkConfig = {
    state: IState;
    dispatch: ThunkAppDispatch;
};
