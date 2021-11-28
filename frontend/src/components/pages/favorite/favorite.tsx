import React from 'react';

import CardSizeSwitcher from '../../common/card-size-switcher/card-size-switcher';
import PostsList from '../../common/post/posts-list/posts-list';

import css from './favorite.module.scss';

const Favorite = (): JSX.Element => {
    const openPage = async (): Promise<void> => {
        console.log('openPage');
    };
    const loadMore = async (): Promise<void> => {
        console.log('openPage');
    };

    return (
        <PostsList className={css.root} onPage={openPage} onMore={loadMore}>
            <>
                <CardSizeSwitcher />
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum cupiditate libero omnis provident quas
                    sint sunt ullam, unde vel? Commodi eaque esse optio veniam vitae! Ab deleniti dolorem excepturi.
                </div>
            </>
        </PostsList>
    );
};

export default Favorite;
