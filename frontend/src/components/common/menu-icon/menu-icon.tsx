import React, { MouseEvent } from 'react';

import Menu from '@mui/icons-material/Menu';
import clsx from 'clsx';

import Button from '../button/button';

import css from './menu-icon.module.scss';

interface IProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const MenuIcon = ({ onClick, className }: IProps): JSX.Element => (
    <Button secondary className={clsx(css.button, className)} type="button" onClick={onClick}>
        <Menu />
    </Button>
);

export default MenuIcon;
