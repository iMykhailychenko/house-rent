import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../state/interfaces';
import { initializeStore } from '../state/store';

export const useAppSelector = <T>(callback: (value: IState) => T, equalityFn?: (left: T, right: T) => boolean): T =>
    useSelector<IState, T>(callback, equalityFn);

const store = initializeStore();
export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
