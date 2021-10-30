import React from 'react';

import BrightnessHigh from '@mui/icons-material/BrightnessHigh';
import BrightnessLow from '@mui/icons-material/BrightnessLow';
import clsx from 'clsx';

import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import Button from '../button/button';

import css from './switch-theme.module.scss';

interface IProps {
    className?: string;
}

const SwitchTheme = ({ className }: IProps): JSX.Element => {
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
