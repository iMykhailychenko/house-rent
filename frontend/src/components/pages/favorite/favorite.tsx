import React from 'react';

import PostsList from '../../common/post/posts-list/posts-list';

const Favorite = (): JSX.Element => {
    const title = 'consectetur adipisicing elit';

    const openPage = async (): Promise<void> => {
        console.log('openPage');
    };
    const loadMore = async (): Promise<void> => {
        console.log('openPage');
    };

    return (
        <PostsList title={title} onPage={openPage} onMore={loadMore}>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum cupiditate libero omnis provident quas sint
                sunt ullam, unde vel? Commodi eaque esse optio veniam vitae! Ab deleniti dolorem excepturi.
            </div>
        </PostsList>
    );
};

export default Favorite;
