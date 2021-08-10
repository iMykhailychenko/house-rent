import { BrightnessHigh, BrightnessLow } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import css from './switch-theme.module.scss';

interface IProps {
    className?: string;
}

const SwitchTheme = ({ className }: IProps): ReactElement => {
    const [theme, setTheme] = useTheme();

    const handleClick = (): void => {
        setTheme(theme === THEME_ENUM.WHITE ? THEME_ENUM.BLACK : THEME_ENUM.WHITE);
    };

    return (
        <button type="button" className={clsx(css.root, className)} onClick={handleClick}>
            {theme === THEME_ENUM.BLACK ? <BrightnessLow /> : <BrightnessHigh />}
        </button>
    );
};

export default SwitchTheme;
