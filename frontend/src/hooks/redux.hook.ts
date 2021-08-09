import { useSelector } from 'react-redux';

import { IState } from '../state/interfaces';

export const useAppSelector = <T>(callback: (value: IState) => T, equalityFn?: (left: T, right: T) => boolean): T =>
    useSelector<IState, T>(callback, equalityFn);
