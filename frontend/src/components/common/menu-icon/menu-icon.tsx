import { Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';

import css from './menu-icon.module.scss';

interface IProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const MenuIcon = ({ onClick, className }: IProps): ReactElement => {
    return (
        <button className={clsx(css.button, className)} type="button" onClick={onClick}>
            <Menu />
        </button>
    );
};

export default MenuIcon;
