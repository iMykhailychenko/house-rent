import React, { ReactElement } from 'react';

import { Bookmark, Share, Visibility } from '@material-ui/icons';
import Link from 'next/link';

import routes from '../../../../utils/routes';
import Button from '../../button/button';
import UserCard from '../../user-card/user-card';

import css from './post-cart-lg.module.scss';

// const mockFilters = {
//     [SEARCH_FILTERS.GENERAL]: ['hot'],
//     [SEARCH_FILTERS.ROOM]: ['two', 'three'],
//     [SEARCH_FILTERS.HOUSE_TYPE]: ['new'],
//     [SEARCH_FILTERS.PRICE]: ['price_two', 'price_three'],
// };

const PostCardLg = (): ReactElement => {
    return (
        <div className={css.root}>
            <UserCard user={{ avatar: null, firstName: 'User', lastName: 'Userovich' }} date="19:01 March 09 2022" />

            <div className={css.content}>
                <Link href={routes.posts.single(1)}>
                    <a className={css.link}>
                        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur consequatur culpa harum
                            id illum iure maiores mollitia necessitatibus odio placeat quaerat quo reiciendis repudiandae sit
                            soluta, tempora, totam veniam!
                        </p>
                    </a>
                </Link>

                {/*<PostCardChips value={mockFilters} />*/}

                <div className={css.info}>
                    <Button secondary>
                        <Share />
                    </Button>
                    <Button secondary>
                        <Bookmark />
                    </Button>
                    <div className={css.visibility}>
                        <Visibility />
                        <span>10</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCardLg;
