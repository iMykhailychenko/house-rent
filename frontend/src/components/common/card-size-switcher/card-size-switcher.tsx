import { Apps, ViewHeadline } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import useConfig from '../../../hooks/config.hook';
import css from './card-size-switcher.module.scss';

const CardSizeSwitcher = (): ReactElement => {
    const [config, setConfig] = useConfig();

    const handleSmallCard = (): void => {
        setConfig({ ...config, cardSize: 'sm' });
    };

    const handleLargeCard = (): void => {
        setConfig({ ...config, cardSize: 'lg' });
    };

    return (
        <div className={css.flex}>
            <button className={clsx(css.button, config.cardSize === 'sm' && css.active)} onClick={handleSmallCard} type="button">
                <ViewHeadline />
            </button>
            <span className={css.separator} />
            <button className={clsx(css.button, config.cardSize === 'lg' && css.active)} onClick={handleLargeCard} type="button">
                <Apps />
            </button>
        </div>
    );
};

export default CardSizeSwitcher;
