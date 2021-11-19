import React from 'react';

import { useLastBannerSelector } from '../../../state/entities/banners/banners.selector';

import css from './banner.module.scss';

const Banners = (): JSX.Element => {
    const banner = useLastBannerSelector();

    return <div className={css.root}>{banner && <div>{banner.content}</div>}</div>;
};

export default Banners;
