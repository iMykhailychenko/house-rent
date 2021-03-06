import React, { useRef, useState } from 'react';

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import clsx from 'clsx';

import useConfig from '../../../../hooks/config.hook';
import useTrans from '../../../../hooks/trans.hook';
import { usePostListSelector } from '../../../../state/entities/posts/posts.selector';
import Container from '../../../layout/container/container';
import StickyModal from '../../modal/components/sticky-modal/sticky-modal';
import { modal } from '../../modal/modal';
import EmptyPostsList from '../../not-found/emprty-posts-list/emprty-posts-list';
import Pagination from '../../pagination/pagination';
import PostCard from '../post-card/post-card';

import css from './posts-list.module.scss';

interface IProps {
    title?: string;
    className?: string;
    children: JSX.Element;
    onPage?: (page: number) => Promise<void>;
    onMore?: (page: number) => Promise<void>;
}

const PostsList = ({ title, className, onPage, onMore, children }: IProps): JSX.Element => {
    const trans = useTrans();
    const [config] = useConfig();
    const postsState = usePostListSelector();
    const loading = postsState.status === 'loading';
    const ref = useRef<HTMLDivElement>(null);

    const [loadingMore, setLoadingMore] = useState(false);

    const openPage = (page: number): void => {
        const top = ref.current?.offsetTop || 0;
        window.scrollTo({ top: top - 150, behavior: 'smooth' });
        onPage && onPage(page).catch(console.log);
    };
    const loadMore = (page: number): void => {
        const top = (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) - 300;
        window.scrollTo({ top, behavior: 'smooth' });
        setLoadingMore(true);
        onMore && onMore(page).finally(() => setLoadingMore(false));
    };

    const openFilters = (): void => {
        modal.open(<StickyModal>{children}</StickyModal>);
    };

    return (
        <Container size="md">
            <div className={clsx(css.root, className)}>
                {title && <h2 className="title-2">{trans(title)}</h2>}

                <div className={css.filter}>
                    <button onClick={openFilters} className={css.filterItem} type="button">
                        <FilterListOutlinedIcon />
                        <span>??????????????</span>
                    </button>
                </div>

                <div className={css.flex}>
                    <div className={css.wrp}>
                        <div ref={ref} className={clsx(css.inner, postsState.data.length ? css[config.cardSize] : css.lg)}>
                            {loading ? (
                                <div className={css.spinner}>
                                    <img src="/spinner.gif" alt="" />
                                </div>
                            ) : postsState.data.length ? (
                                postsState.data.map((item, index) => <PostCard index={index} key={item.id} post={item} />)
                            ) : (
                                <EmptyPostsList />
                            )}

                            {loadingMore && (
                                <div className={css.spinner}>
                                    <img src="/spinner.gif" alt="" />
                                </div>
                            )}
                        </div>
                        <Pagination
                            total={postsState.totalPages}
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
