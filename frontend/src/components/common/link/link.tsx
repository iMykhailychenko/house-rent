import clsx from 'clsx';
import NextLink from 'next/link';
import React, { ReactElement } from 'react';

import css from './link.module.scss';

interface IProps {
    href: string;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    type?: 'link' | 'button';
    title?: string;
    children: ReactElement[] | ReactElement | string;
}

const Link = ({ type = 'link', href, className, children, primary, secondary, title }: IProps): ReactElement => {
    return (
        <NextLink href={href} passHref>
            <a
                title={title}
                className={clsx(className, type === 'link' ? css.link : css.button, {
                    [css.primary]: primary,
                    [css.secondary]: secondary,
                })}
            >
                {children}
            </a>
        </NextLink>
    );
};

export default Link;
