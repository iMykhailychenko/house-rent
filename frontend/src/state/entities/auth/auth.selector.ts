import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IAuthState } from './auth.interface';

export const useAuthSelector = (): IAuthState => useAppSelector<IAuthState>(({ auth }: RootState) => auth);
