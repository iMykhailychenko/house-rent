import React, { ReactElement } from 'react';

import Drawer from '@material-ui/core/Drawer';

import css from './app-drawer.module.scss';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: IProps): ReactElement => {
    return (
        <Drawer open={open} onClose={onClose}>
            <div className={css.inner}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deserunt dignissimos esse eum, ex libero
                maiores modi molestias, nulla perspiciatis, provident quisquam sapiente tempora vero voluptates. Architecto
                asperiores quod vero.
            </div>
        </Drawer>
    );
};

export default AppDrawer;
