import React, { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { Banner } from '../../../../../state/entities/banners/banners.interface';
import { deleteAllBanners, deleteBanner } from '../../../../../state/entities/banners/banners.reducer';
import { useBannersSelector } from '../../../../../state/entities/banners/banners.selector';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './show-all-banners.module.scss';

interface IProps {
    banner: Banner;
}
const BannerItem = ({ banner }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const banners = useBannersSelector();

    const handleDelete = useCallback((): void => {
        if (banners.length === 1) modal.close();
        dispatch(deleteBanner(banner.id));
    }, [banner.id, banners.length, dispatch]);

    return (
        <li className={clsx(css.banner, css[banner.type])}>
            <div className={css.content}>{banner.content}</div>
            <button className={css.close} type="button" onClick={handleDelete}>
                <CloseIcon />
            </button>
        </li>
    );
};

const ShowAllBanners = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const banners = useBannersSelector();

    const handleDeleteAll = () => {
        dispatch(deleteAllBanners());
        modal.close();
    };

    return (
        <StickyModal
            title="Список усіх повідомленнь"
            footer={
                <>
                    <Button primary onClick={handleDeleteAll}>
                        Видалити усі повідомлення
                    </Button>
                </>
            }
        >
            <ul>
                {banners.map(banner => (
                    <BannerItem key={banner.id} banner={banner} />
                ))}
            </ul>
        </StickyModal>
    );
};

const showAllBanners = (): void => {
    modal.open(<ShowAllBanners />);
};

export default showAllBanners;
