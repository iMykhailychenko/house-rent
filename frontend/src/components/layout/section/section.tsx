import React, { ReactElement } from 'react';

import clsx from 'clsx';

import css from './section.module.scss';

interface IProps {
    id?: string;
    className?: string;
    children: ReactElement;
}

const Section = ({ id, className, children }: IProps): ReactElement => (
    <section id={id} className={clsx(css.root, className)}>
        {children}
    </section>
);

export default Section;
