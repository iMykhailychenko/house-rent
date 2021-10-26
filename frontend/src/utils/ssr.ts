import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';

import { cookiesTokenAction } from '../state/entities/auth/auth.reducer';
import { profileInfoThunk } from '../state/entities/profile/profile.thunk';
import rootInitialState from '../state/initial-state';
import { RootState } from '../state/reducer';
import { initializeStore } from '../state/store';

import routes from './routes';

type NextReturnCallback<T> = { props: T | { state: RootState } } | { redirect: Redirect };
type CustomReturnCallback<T> = { props?: T | { state: RootState }; redirect?: boolean } | void;

type SSRCallback<T> = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: GetServerSidePropsContext & { store?: Store<RootState, any> },
) => Promise<CustomReturnCallback<T>>;

export const withStore = <T>(callback?: SSRCallback<T>): GetServerSideProps => {
    return async (context: GetServerSidePropsContext): Promise<NextReturnCallback<T>> => {
        const store = initializeStore(rootInitialState);

        const token = axios.defaults.headers.common.Authorization;
        if (token) {
            await store.dispatch(profileInfoThunk());
            await store.dispatch(cookiesTokenAction(token));
        }

        if (callback) {
            const result = await callback({ ...context, store });
            if (result?.redirect)
                return {
                    redirect: {
                        statusCode: 302,
                        destination: routes.home,
                    },
                };

            return { props: { ...(result?.props || {}), state: store.getState() } };
        }

        return { props: { state: store.getState() } };
    };
};

export const withAuthRedirect =
    <T>(callback?: SSRCallback<T> | null, reverse = false): GetServerSideProps =>
    async (context: GetServerSidePropsContext): Promise<NextReturnCallback<T>> => {
        const token = axios.defaults.headers.common.Authorization;
        if (reverse ? token : !token) {
            return {
                redirect: {
                    statusCode: 302,
                    destination: reverse ? routes.home : routes.auth.login,
                },
            };
        }

        const store = initializeStore(rootInitialState);

        if (!reverse && token) {
            await store.dispatch(profileInfoThunk());
            await store.dispatch(cookiesTokenAction(token));
        }

        if (callback) {
            const result = await callback({ ...context, store });

            if (result?.redirect) {
                return {
                    redirect: {
                        statusCode: 302,
                        destination: reverse ? routes.home : routes.auth.login,
                    },
                };
            }

            return { props: { ...(result?.props || {}), state: store.getState() } };
        }

        return { props: { state: store.getState() } };
    };
