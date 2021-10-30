import React, { useRef, useState } from 'react';

import uiConfig from '../../../config/ui.config';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { POST_STATUS } from '../../../state/entities/posts/posts.interface';
import { usePostListSelector } from '../../../state/entities/posts/posts.selector';
import {
    personalPostsListPaginationThunk,
    personalPostsListThunk,
} from '../../../state/entities/posts/thunks/personal-posts.thunk';
import EmptyPostsList from '../../common/not-found/emprty-posts-list/emprty-posts-list';
import Pagination from '../../common/pagination/pagination';
import UserPostCard from '../../common/post/user-post-card/user-post-card';
import PostsMdSkeleton from '../../common/skeletons/posts-sleleton/components/posts-md-skeleton';

import css from './my-posts.module.scss';

const MyPostsList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const postsState = usePostListSelector();
    const loading = postsState.status === 'loading';
    const ref = useRef<HTMLDivElement>(null);

    const [loadingMore, setLoadingMore] = useState(false);

    const openPage = (page: number): void => {
        const top = ref.current?.offsetTop || 0;
        window.scrollTo({ top: top - 150, behavior: 'smooth' });
        dispatch(personalPostsListThunk({ status: POST_STATUS.IDLE, page }));
    };
    const loadMore = (page: number): void => {
        const top = (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) - 300;
        window.scrollTo({ top, behavior: 'smooth' });

        setLoadingMore(true);
        dispatch(personalPostsListPaginationThunk({ status: POST_STATUS.IDLE, page })).finally(() => {
            setLoadingMore(false);
        });
    };

    return (
        <div className={css.wrp}>
            <div ref={ref} className={css.inner}>
                {loading ? (
                    <PostsMdSkeleton className={css.card} amount={uiConfig.postsPerPage} />
                ) : postsState.data.length ? (
                    postsState.data.map(item => <UserPostCard key={item.id} post={item} />)
                ) : (
                    <EmptyPostsList />
                )}
                {loadingMore && <PostsMdSkeleton className={css.card} amount={Math.ceil(uiConfig.postsPerPage / 2)} />}
            </div>
            <Pagination total={postsState.totalPages} loading={loading || loadingMore} onPage={openPage} onMore={loadMore} />
        </div>
    );
};

export default MyPostsList;
