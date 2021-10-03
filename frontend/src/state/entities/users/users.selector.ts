import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IUserState } from './users.interface';

export const useUserInfoSelector = (): IUserState => useAppSelector<IUserState>(({ users }: RootState) => users, shallowEqual);
