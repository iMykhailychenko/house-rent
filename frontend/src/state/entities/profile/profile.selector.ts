import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IProfileInfoState } from './profile.interface';

export const useProfileInfoSelector = (): IProfileInfoState =>
    useAppSelector<IProfileInfoState>(({ profile }: RootState) => profile, shallowEqual);
