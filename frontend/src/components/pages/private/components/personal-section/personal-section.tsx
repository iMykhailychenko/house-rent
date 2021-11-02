import React from 'react';

import css from './personal-section.module.scss';

interface IProps {
    children: JSX.Element;
}

const PersonalSection = ({ children }: IProps): JSX.Element => {
    return <div className={css.root}>{children}</div>;
};

export default PersonalSection;
