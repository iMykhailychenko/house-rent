import React from 'react';

import clsx from 'clsx';
import NextLink from 'next/link';

import css from './link.module.scss';

interface IProps {
    href: string;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    loading?: boolean;
    type?: 'link' | 'button';
    title?: string;
    children: JSX.Element[] | JSX.Element | string;
}

const Link = ({ type = 'link', href, className, children, loading, primary, secondary, title }: IProps): JSX.Element => {
    return (
        <NextLink href={href}>
            <a
                title={title}
                className={clsx(className, type === 'link' ? css.link : css.button, {
                    [css.loading]: loading,
                    [css.primary]: primary,
                    [css.secondary]: secondary,
                })}
            >
                {loading && <img className={css.spinner} src="/spinner.gif" alt="loading" />}
                <span className={css.children}>{children}</span>
            </a>
        </NextLink>
    );
};

export default Link;
