import { BrightnessHigh, BrightnessLow } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import useTheme from '../../../hooks/theme.hook';
import css from './switch-theme.module.scss';

interface IProps {
    className?: string;
}

const SwitchTheme = ({ className }: IProps): ReactElement => {
    const [theme, setTheme] = useTheme();

    const handleClick = (): void => {
        setTheme(theme === 'white' ? 'black' : 'white');
    };

    return (
        <button type="button" className={clsx(css.root, className)} onClick={handleClick}>
            {theme === 'white' ? <BrightnessLow /> : <BrightnessHigh />}
        </button>
    );
};

export default SwitchTheme;
