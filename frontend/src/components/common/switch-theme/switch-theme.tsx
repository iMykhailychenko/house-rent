import React from 'react';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
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
        <Button className={clsx(css.root, className)} secondary onClick={handleClick}>
            <LightModeOutlinedIcon />
        </Button>
    );
};

export default SwitchTheme;
