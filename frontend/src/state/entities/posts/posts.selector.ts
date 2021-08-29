import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { RootState } from '../../reducer';

import { INewPostState } from './posts.interface';

export const useNewPostSelector = (): INewPostState =>
    useAppSelector<INewPostState>(({ posts }: RootState) => posts.new, shallowEqual);
