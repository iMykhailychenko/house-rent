import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../state/interfaces/root';
import { RootState } from '../state/reducer';

export const useAppSelector = <T>(callback: (value: IState) => T, equalityFn?: (left: T, right: T) => boolean): T =>
    useSelector<IState, T>(callback, equalityFn);

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<ThunkAppDispatch>();
