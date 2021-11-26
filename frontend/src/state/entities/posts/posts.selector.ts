import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { ThunkStatuses } from '../../interfaces';
import { RootState } from '../../reducer';

import { INewPostState, IPostListState, ISinglePostState } from './posts.interface';

export const useNewPostSelector = (): INewPostState =>
    useAppSelector<INewPostState>(({ posts }: RootState) => posts.new, shallowEqual);

export const useSinglePostSelector = (): ISinglePostState =>
    useAppSelector<ISinglePostState>(({ posts }: RootState) => posts.single, shallowEqual);

export const usePostListSelector = (): IPostListState =>
    useAppSelector<IPostListState>(({ posts }: RootState) => posts.list, shallowEqual);

export const useUpdateLoadingSelector = (): ThunkStatuses =>
    useAppSelector<ThunkStatuses>(({ posts }: RootState) => posts.update.status, shallowEqual);
