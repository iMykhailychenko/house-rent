import React, { ReactElement } from 'react';

import css from './post-cart-sm.module.scss';

const PostCardSm = (): ReactElement => {
    return (
        <div className={css.root}>
            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur consequatur culpa harum id illum
                iure maiores mollitia necessitatibus odio placeat quaerat quo reiciendis repudiandae sit soluta, tempora, totam
                veniam!
            </p>
        </div>
    );
};

export default PostCardSm;
