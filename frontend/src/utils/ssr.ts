import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';

import { cookiesTokenAction } from '../state/entities/auth/auth.reducer';
import { profileInfoThunk } from '../state/entities/profile/profile.thunk';
import rootInitialState from '../state/initial-state';
import { RootState } from '../state/reducer';
import { initializeStore } from '../state/store';

import routes from './routes';

type ReturnCallback<T> = { props: T | { state: RootState } };
type SSRCallback<T> = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: GetServerSidePropsContext & { store?: Store<RootState, any> },
) => Promise<ReturnCallback<T> | void>;

export const withStore = <T>(callback?: SSRCallback<T>): GetServerSideProps => {
    return async (context: GetServerSidePropsContext): Promise<ReturnCallback<T>> => {
        const store = initializeStore(rootInitialState);

        const token = axios.defaults.headers.common.Authorization;
        if (token) {
            await store.dispatch(profileInfoThunk());
            await store.dispatch(cookiesTokenAction(token));
        }

        if (callback) {
            const result = await callback({ ...context, store });
            return { props: { ...(result?.props || {}), state: store.getState() } };
        }

        return { props: { state: store.getState() } };
    };
};

export const withAuthRedirect =
    <T>(callback: SSRCallback<T> | null, reverse = false): GetServerSideProps =>
    async (context: GetServerSidePropsContext): Promise<ReturnCallback<T> | { redirect: Redirect }> => {
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
            return { props: { ...(result?.props || {}), state: store.getState() } };
        }

        return { props: { state: store.getState() } };
    };
