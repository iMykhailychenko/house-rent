import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { IMediaState } from './media.interface';

export const useUploadMediaSelector = (): IMediaState =>
    useAppSelector<IMediaState>(({ media }: RootState) => media, shallowEqual);
