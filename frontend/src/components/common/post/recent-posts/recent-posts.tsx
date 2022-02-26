import React from 'react';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';

import { useRecentPosts } from '../../../../hooks/recent-posts.hook';
import routes from '../../../../utils/routes';
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

                        {offers.length % 4 !== 0 && (
                            <CSSTransition in timeout={100 + (offers.length + 1) * 100} appear>
                                <Link href={routes.posts.new}>
                                    <a className={css.newPost}>
                                        <p>Створити нове оголошення</p>
                                        <ArrowForwardOutlinedIcon />
                                    </a>
                                </Link>
                            </CSSTransition>
                        )}
                    </div>
                </Container>
            ) : null}
        </>
    );
};

export default RecentPosts;
