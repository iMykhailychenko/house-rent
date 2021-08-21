import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IAuthInitialState } from './auth.interface';

export const useAuthSelector = (): IAuthInitialState =>
    useAppSelector<IAuthInitialState>(({ auth }: RootState) => auth, shallowEqual);
