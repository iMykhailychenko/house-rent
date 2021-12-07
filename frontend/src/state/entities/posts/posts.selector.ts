import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { LoadingStatus } from '../../interfaces';
import { RootState } from '../../reducer';

import { INewPostState, IPost, IPostListState, ISinglePostState } from './posts.interface';

export const useNewPostSelector = (): INewPostState =>
    useAppSelector<INewPostState>(({ posts }: RootState) => posts.new, shallowEqual);

export const useSinglePostSelector = (): ISinglePostState =>
    useAppSelector<ISinglePostState>(({ posts }: RootState) => posts.single, shallowEqual);

export const usePostListSelector = (): IPostListState =>
    useAppSelector<IPostListState>(({ posts }: RootState) => posts.list, shallowEqual);

export const useUpdateLoadingSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ posts }: RootState) => posts.update.status, shallowEqual);

export const useConfigDataSelector = (): { [id: string]: IPost & { isFavorite: boolean } } =>
    useAppSelector<{ [id: string]: IPost & { isFavorite: boolean } }>(({ posts }: RootState) => posts.config.data, shallowEqual);
