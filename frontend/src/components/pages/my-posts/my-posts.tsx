import React, { useRef, useState } from 'react';

import { useRouter } from 'next/router';

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

import css from './my-posts.module.scss';

const MyPostsList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const postsState = usePostListSelector();
    const loading = postsState.status === 'loading';
    const ref = useRef<HTMLDivElement>(null);

    const history = useRouter();
    const status = String(history.query.status || POST_STATUS.ACTIVE) as POST_STATUS;
    const [loadingMore, setLoadingMore] = useState(false);

    const openPage = (page: number): void => {
        const top = ref.current?.offsetTop || 0;
        window.scrollTo({ top: top - 150, behavior: 'smooth' });
        dispatch(personalPostsListThunk({ status, page }));
    };
    const loadMore = (page: number): void => {
        const top = (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) - 300;
        window.scrollTo({ top, behavior: 'smooth' });
        setLoadingMore(true);
        dispatch(personalPostsListPaginationThunk({ status, page })).finally(() => {
            setLoadingMore(false);
        });
    };

    return (
        <div ref={ref} className={css.wrp}>
            {!!postsState.totalItems && <h2 className={css.title}>Всього знайдено оголошень: {postsState.totalItems}</h2>}

            {loading ? (
                <div className={css.inner} />
            ) : postsState.data.length ? (
                <div className={css.inner}>
                    {postsState.data.map((item, index) => (
                        <UserPostCard index={index} key={item.id} post={item} />
                    ))}

                    {loadingMore && (
                        <div className={css.spinner}>
                            <img src="/spinner.gif" alt="" />
                        </div>
                    )}
                </div>
            ) : (
                <EmptyPostsList />
            )}

            <Pagination total={postsState.totalPages} loading={loading || loadingMore} onPage={openPage} onMore={loadMore} />
        </div>
    );
};

export default MyPostsList;
