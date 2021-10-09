import React, { ReactElement } from 'react';

import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import ViewHeadline from '@mui/icons-material/ViewHeadline';
import clsx from 'clsx';

import useConfig from '../../../hooks/config.hook';

import css from './card-size-switcher.module.scss';

const CardSizeSwitcher = (): ReactElement => {
    const [config, setConfig] = useConfig();

    const handleSmallCard = (): void => setConfig({ ...config, cardSize: 'sm' });
    const handleMidCard = (): void => setConfig({ ...config, cardSize: 'md' });
    const handleLargeCard = (): void => setConfig({ ...config, cardSize: 'lg' });

    return (
        <>
            <h4 className={css.title}>Змінити розмір оголошення</h4>
            <div className={css.flex}>
                <button
                    className={clsx(css.button, config.cardSize === 'lg' && css.active)}
                    onClick={handleLargeCard}
                    title="large cards"
                    type="button"
                >
                    <ViewHeadline />
                </button>
                <button
                    className={clsx(css.button, config.cardSize === 'md' && css.active)}
                    onClick={handleMidCard}
                    title="middle cards"
                    type="button"
                >
                    <Grid3x3Icon />
                </button>
                <button
                    className={clsx(css.button, config.cardSize === 'sm' && css.active)}
                    onClick={handleSmallCard}
                    title="small cards"
                    type="button"
                >
                    <Grid4x4Icon />
                </button>
            </div>
        </>
    );
};

export default CardSizeSwitcher;
