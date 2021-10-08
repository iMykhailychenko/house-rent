import React, { ReactElement } from 'react';

import Apps from '@material-ui/icons/Apps';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewHeadline from '@material-ui/icons/ViewHeadline';
import clsx from 'clsx';

import useConfig from '../../../hooks/config.hook';

import css from './card-size-switcher.module.scss';

const CardSizeSwitcher = (): ReactElement => {
    const [config, setConfig] = useConfig();

    const handleSmallCard = (): void => setConfig({ ...config, cardSize: 'sm' });
    const handleMidCard = (): void => setConfig({ ...config, cardSize: 'md' });
    const handleLargeCard = (): void => setConfig({ ...config, cardSize: 'lg' });

    return (
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
                <Apps />
            </button>
            <button
                className={clsx(css.button, config.cardSize === 'sm' && css.active)}
                onClick={handleSmallCard}
                title="small cards"
                type="button"
            >
                <ViewComfyIcon />
            </button>
        </div>
    );
};

export default CardSizeSwitcher;
