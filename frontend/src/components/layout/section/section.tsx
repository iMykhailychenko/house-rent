import React from 'react';

import clsx from 'clsx';

import css from './section.module.scss';

interface IProps {
    id?: string;
    className?: string;
    children: JSX.Element;
}

const Section = ({ id, className, children }: IProps): JSX.Element => (
    <section id={id} className={clsx(css.root, className)}>
        {children}
    </section>
);

export default Section;
