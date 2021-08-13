import Link from 'next/link';
import React, { ReactElement } from 'react';
import Zoom from 'react-medium-image-zoom';

import { SEARCH_FILTERS } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import PostCardChips from '../post-cart-chips/post-cart-chips';
import css from './post-cart-sm.module.scss';

const mockFilters = {
    [SEARCH_FILTERS.GENERAL]: ['hot'],
    [SEARCH_FILTERS.ROOM]: ['two', 'three'],
    [SEARCH_FILTERS.HOUSE_TYPE]: ['new'],
    [SEARCH_FILTERS.PRICE]: ['price_two', 'price_three'],
    [SEARCH_FILTERS.CITY]: ['kyiv'],
};

const PostCardSm = (): ReactElement => {
    return (
        <div className={css.root}>
            <Zoom overlayBgColorStart="transparent" overlayBgColorEnd="transparent">
                <img height="200" width="200" className={css.img} src="/mock.jpeg" alt="" />
            </Zoom>
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
                <PostCardChips value={mockFilters} />
            </div>
        </div>
    );
};

export default PostCardSm;
