import React from 'react';

import clsx from 'clsx';

import useConfig from '../../../hooks/config.hook';

import css from './card-size-switcher.module.scss';

interface IProps {
    className?: string;
}

const CardSizeSwitcher = ({ className }: IProps): JSX.Element => {
    const [config, setConfig] = useConfig();

    const handleSmallCard = (): void => setConfig({ ...config, cardSize: 'sm' });
    const handleMidCard = (): void => setConfig({ ...config, cardSize: 'md' });
    const handleLargeCard = (): void => setConfig({ ...config, cardSize: 'lg' });

    return (
        <div className={className}>
            <h4 className={css.title}>Змінити розмір оголошення</h4>
            <div className={css.flex}>
                <button
                    className={clsx(css.button, config.cardSize === 'lg' && css.active)}
                    onClick={handleLargeCard}
                    title="large cards"
                    type="button"
                >
                    1x
                </button>
                <button
                    className={clsx(css.button, config.cardSize === 'md' && css.active)}
                    onClick={handleMidCard}
                    title="middle cards"
                    type="button"
                >
                    2x
                </button>
                <button
                    className={clsx(css.button, config.cardSize === 'sm' && css.active)}
                    onClick={handleSmallCard}
                    title="small cards"
                    type="button"
                >
                    3x
                </button>
            </div>
        </div>
    );
};

export default CardSizeSwitcher;
