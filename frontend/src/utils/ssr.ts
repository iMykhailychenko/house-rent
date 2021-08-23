import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { cookiesTokenAction } from '../state/entities/auth/auth.reducer';
import { profileInfoThunk } from '../state/entities/profile/profile.thunk';
import rootInitialState from '../state/initial-state';
import { RootState } from '../state/reducer';
import { initializeStore } from '../state/store';

import routes from './routes';

interface ExtendState {
    state: RootState;
}

export type SSRContext = GetServerSidePropsContext & { store: Store };

type ServerSideCallback<T extends ExtendState> = (context: SSRContext) => Promise<{ props: T }>;
type WithStore = <T extends ExtendState>(callback?: ServerSideCallback<T>) => GetServerSideProps;

export const withStore: WithStore = <T extends ExtendState>(callback?: ServerSideCallback<T>): GetServerSideProps => {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const store = initializeStore(rootInitialState);

        const token = axios.defaults.headers.common.Authorization;
        if (token) {
            await store.dispatch(profileInfoThunk());
            await store.dispatch(cookiesTokenAction(token));
        }

        if (callback) {
            const result = await callback({ ...context, store });
            return { props: { ...result.props, state: store.getState() } };
        }

        return { props: { state: store.getState() } } as GetServerSidePropsResult<T>;
    };
};

type WithAuthRedirect = <T extends ExtendState>(callback: ServerSideCallback<T> | null, reverse?: boolean) => GetServerSideProps;
export const withAuthRedirect: WithAuthRedirect =
    <T extends ExtendState>(callback: ServerSideCallback<T> | null, reverse = false): GetServerSideProps =>
    async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const token = axios.defaults.headers.common.Authorization;
        if (reverse ? token : !token) {
            return {
                redirect: {
                    statusCode: 302,
                    destination: routes.auth.login,
                },
            };
        }

        const store = initializeStore(rootInitialState);

        if (callback) {
            const result = await callback({ ...context, store });
            return { props: { ...result.props, state: store.getState() } };
        }

        return { props: { state: store.getState() } } as GetServerSidePropsResult<T>;
    };
