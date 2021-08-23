import React, { CSSProperties, ReactElement } from 'react';

import clsx from 'clsx';

import css from './user-avatar.module.scss';

interface IProps {
    src?: string | null;
    firstName?: string;
    lastName?: string;
    className?: string;
    diameter?: number;
}

const UserAvatar = ({ className, src, firstName = '-', lastName = '-', diameter = 4 }: IProps): ReactElement => {
    const style: CSSProperties = { height: `${diameter}rem`, width: `${diameter}rem` };
    return src ? (
        <img className={clsx(css.img, className)} style={style} src={src} alt="User avatar" title="User avatar" />
    ) : (
        <div className={clsx(css.img, css.name, className)} style={style}>{`${firstName[0]}${lastName[0]}`}</div>
    );
};

export default UserAvatar;
