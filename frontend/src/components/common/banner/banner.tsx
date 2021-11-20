import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { useAppDispatch } from '../../../hooks/redux.hook';
import { deleteBanner } from '../../../state/entities/banners/banners.reducer';
import { useBannersSelector } from '../../../state/entities/banners/banners.selector';
import showAllBanners from '../modal/modals/show-all-banners/show-all-banners';

import css from './banner.module.scss';

const Banners = (): JSX.Element | null => {
    const dispatch = useAppDispatch();
    const banners = useBannersSelector();
    const [banner] = banners;

    const handleClose = (): void => {
        dispatch(deleteBanner(banner.id));
    };

    return (
        <div className={clsx(css.root, banner && css.open, css[banner?.type])}>
            <div className={css.content}>{banner?.content}</div>

            <div className={css.flex}>
                {banners.length > 1 && (
                    <button className={css.more} type="button" onClick={showAllBanners}>
                        Всього ({banners.length})
                    </button>
                )}
                <button className={css.close} type="button" onClick={handleClose}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default Banners;
