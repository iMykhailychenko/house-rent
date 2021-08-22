import { Store } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import rootInitialState from '../state/initial-state';
import { initializeStore } from '../state/store';

import routes from './routes';

export type SSRContext = GetServerSidePropsContext & { store: Store };
type ServerSideCallback<T> = (context: SSRContext) => Promise<GetServerSidePropsResult<T>>;
type WithStore = <T>(callback: ServerSideCallback<T>) => GetServerSideProps;

export const withStore: WithStore =
    <T>(callback: ServerSideCallback<T>): GetServerSideProps =>
    async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
        const store = initializeStore(rootInitialState);
        return await callback({ ...context, store });
    };

type WithAuthRedirect = <T>(callback: ServerSideCallback<T> | null, reverse?: boolean) => GetServerSideProps;
export const withAuthRedirect: WithAuthRedirect =
    <T>(callback: ServerSideCallback<T> | null, reverse = false): GetServerSideProps =>
    async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T | { auth: boolean }>> => {
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

        if (callback) return await callback({ ...context, store });
        return { props: { auth: false } };
    };
