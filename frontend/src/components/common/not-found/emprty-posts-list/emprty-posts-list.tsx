import React from 'react';

import css from './emprty-posts-list.module.scss';

const EmptyPostsList = (): JSX.Element => {
    return (
        <div className={css.root}>
            <img className={css.img} src="/icons/empty.png" alt="" />
            <p className={css.text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
            </p>
        </div>
    );
};

export default EmptyPostsList;
