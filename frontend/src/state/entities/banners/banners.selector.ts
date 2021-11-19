import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { Banner } from './banners.interface';

export const useBannersSelector = (): Banner[] => useAppSelector<Banner[]>(({ banners }: RootState) => banners, shallowEqual);
export const useLastBannerSelector = (): Banner => useAppSelector<Banner>(({ banners }: RootState) => banners[0], shallowEqual);
