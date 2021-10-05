import React, { ReactElement, useRef, useState } from 'react';

import uiConfig from '../../../config/ui.config';
import useConfig from '../../../hooks/config.hook';
import useTrans from '../../../hooks/trans.hook';
import { IPostListState } from '../../../state/entities/posts/posts.interface';
import { usePostListSelector } from '../../../state/entities/posts/posts.selector';
import EmptyPostsList from '../../common/nothing-to-show/emprty-posts-list/emprty-posts-list';
import Pagination from '../../common/pagination/pagination';
import PostCard from '../../common/post-card/post-card';
import PostsSkeleton from '../../common/skeletons/posts-sleleton/posts-skeleton';
import Container from '../container/container';

import css from './posts-list.module.scss';

interface IProps {
    title?: string;
    posts: IPostListState;
    children: ReactElement;
    onPage: (page: number) => Promise<void>;
    onMore: (page: number) => Promise<void>;
}

const PostsList = ({ title, posts, onPage, onMore, children }: IProps): ReactElement => {
    const trans = useTrans();
    const [config] = useConfig();
    const postsState = usePostListSelector();
    const loading = postsState.status === 'loading';
    const ref = useRef<HTMLDivElement>(null);

    const [loadingMore, setLoadingMore] = useState(false);

    const openPage = (page: number): void => {
        const top = ref.current?.offsetTop || 0;
        window.scrollTo({ top: top - 150, behavior: 'smooth' });
        onPage(page).catch(console.log);
    };
    const loadMore = (page: number): void => {
        const top = (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) - 300;
        window.scrollTo({ top, behavior: 'smooth' });
        setLoadingMore(true);
        onMore(page).finally(() => setLoadingMore(false));
    };

    return (
        <Container size="md">
            <div className={css.root}>
                {title && <h2 className="title-2">{trans(title)}</h2>}

                <div className={css.flex}>
                    <div className={css[config.cardSize]}>
                        <div ref={ref} className={css.inner}>
                            {loading ? (
                                <PostsSkeleton amount={uiConfig.postsPerPage} />
                            ) : posts.data.length ? (
                                posts.data.map(item => <PostCard key={item.id} post={item} />)
                            ) : (
                                <EmptyPostsList />
                            )}
                            {loadingMore && <PostsSkeleton amount={uiConfig.postsPerPage / 2} />}
                        </div>
                        <Pagination
                            total={posts.totalPages}
                            loading={loading || loadingMore}
                            onPage={openPage}
                            onMore={loadMore}
                        />
                    </div>
                    <aside className={css.aside}>{children}</aside>
                </div>
            </div>
        </Container>
    );
};

export default PostsList;