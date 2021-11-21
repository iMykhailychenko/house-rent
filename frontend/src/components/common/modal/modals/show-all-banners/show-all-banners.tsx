import React, { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { banner } from '../../../banner/banner';
import { Banner } from '../../../banner/banner.interface';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './show-all-banners.module.scss';

interface BannerItemProps {
    item: Banner;
    banners: Banner[];
}
const BannerItem = ({ item, banners }: BannerItemProps): JSX.Element => {
    const handleDelete = useCallback((): void => {
        if (banners.length === 1) modal.close();
        banner.remove(item.id);
    }, [item.id, banners.length]);

    return (
        <li className={clsx(css.banner, css[item.type])}>
            <div className={css.content}>{item.content}</div>
            <button className={css.close} type="button" onClick={handleDelete}>
                <CloseIcon />
            </button>
        </li>
    );
};

interface ShowAllBannersProps {
    banners: Banner[];
}

const ShowAllBanners = ({ banners }: ShowAllBannersProps): JSX.Element => {
    const handleDeleteAll = () => {
        banner.removeAll();
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
                    <BannerItem key={banner.id} item={banner} banners={banners} />
                ))}
            </ul>
        </StickyModal>
    );
};

const showAllBanners = (banners: Banner[]): void => {
    modal.open(<ShowAllBanners banners={banners} />);
};

export default showAllBanners;
