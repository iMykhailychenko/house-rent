import React from 'react';

import { useRecentPosts } from '../../../../hooks/recent-posts.hook';
import Container from '../../../layout/container/container';

import { RecentPostsItem } from './recent-posts-item/recent-posts-item';
import css from './recent-posts.module.scss';

const RecentPosts = (): JSX.Element => {
    const storage = useRecentPosts();
    const offers = storage.get();

    return (
        <>
            {offers.length ? (
                <Container size="md" className={css.root}>
                    <h2 className={css.title}>Недавно просмотренные объявления</h2>

                    <div className={css.wrapper}>
                        {offers.map((item, index) => (
                            <RecentPostsItem key={item.id} post={item} index={index} />
                        ))}
                    </div>
                </Container>
            ) : null}
        </>
    );
};

export default RecentPosts;
