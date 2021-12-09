import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { CommonState, LoadingStatus } from '../../interfaces/common';
import { RootState } from '../../reducer';

import { FORM_TYPE, IPost, IPostListState } from './posts.interface';

export const useNewPostSelector = (): CommonState<IPost | null> & { formType: FORM_TYPE } =>
    useAppSelector<CommonState<IPost | null> & { formType: FORM_TYPE }>(({ posts }: RootState) => posts.new, shallowEqual);

export const useSinglePostSelector = (): CommonState<IPost> =>
    useAppSelector<CommonState<IPost>>(({ posts }: RootState) => posts.single, shallowEqual);

export const usePostListSelector = (): IPostListState =>
    useAppSelector<IPostListState>(({ posts }: RootState) => posts.list, shallowEqual);

export const useUpdateLoadingSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ posts }: RootState) => posts.update.status, shallowEqual);

export const useConfigDataSelector = (): { [id: string]: IPost & { isFavorite: boolean } } =>
    useAppSelector<{ [id: string]: IPost & { isFavorite: boolean } }>(({ posts }: RootState) => posts.config.data, shallowEqual);
