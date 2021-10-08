import React, { ReactElement } from 'react';

import BrightnessHigh from '@material-ui/icons/BrightnessHigh';
import BrightnessLow from '@material-ui/icons/BrightnessLow';
import clsx from 'clsx';

import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import Button from '../button/button';

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
        <Button className={clsx(css.root, className)} onClick={handleClick}>
            {theme === THEME_ENUM.BLACK ? <BrightnessLow /> : <BrightnessHigh />}
        </Button>
    );
};

export default SwitchTheme;
