import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IRatingState } from './rating.interface';

export const useUserRatingSelector = (): IRatingState => useAppSelector<IRatingState>(({ rating }: RootState) => rating);
