import React from 'react';

import EditIcon from '@mui/icons-material/Edit';

import css from './common.module.scss';

interface IProps {
    title?: string;
    icon?: JSX.Element;
    children: JSX.Element;
    onClick?: () => void;
}

const Section = ({ icon, title, children, onClick }: IProps): JSX.Element => {
    return (
        <div className={css.root}>
            <div className={css.header}>
                <div className={css.title}>
                    {icon}
                    {title && <h4>{title}</h4>}
                </div>
                {onClick && (
                    <button className={css.link} type="button" onClick={onClick}>
                        <EditIcon />
                        <span>Редагувати</span>
                    </button>
                )}
            </div>
            {children}
        </div>
    );
};

export default Section;
