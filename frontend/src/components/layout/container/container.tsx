import clsx from 'clsx';
import React, { ReactElement } from 'react';

import css from './container.module.scss';

interface IProps {
    id?: string;
    className?: string;
    children: ReactElement[] | ReactElement | string;
}

const Container = ({ id, className, children }: IProps): ReactElement => {
    return (
        <div id={id} className={clsx(css.container, className)}>
            {children}
        </div>
    );
};

export default Container;
