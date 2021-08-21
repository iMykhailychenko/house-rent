import React, { ReactElement } from 'react';

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import clsx from 'clsx';
import Link from 'next/link';

import css from './arrow-link.module.scss';

interface IProps {
    href: string;
    children: string;
    className?: string;
    direction?: 'left' | 'right';
}

const ArrowLink = ({ href, children, className, direction = 'right' }: IProps): ReactElement => (
    <Link href={href} passHref>
        <a className={clsx(css.link, className)}>
            {direction === 'left' && <ChevronLeft />}
            <span>{children}</span>
            {direction === 'right' && <ChevronRight />}
        </a>
    </Link>
);

export default ArrowLink;
