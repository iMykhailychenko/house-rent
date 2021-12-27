import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from 'next/link';

import Container from '../../container/container';

import css from './header-back-btn.module.scss';

interface IProps {
    href?: string;
}
export const HeaderBackBtn = ({ href }: IProps): JSX.Element => {
    return (
        <>
            {href ? (
                <Container className={css.back} size="md">
                    <Link href={href}>
                        <a className={css.link}>
                            <ArrowBackIosIcon />
                            <span>Назад</span>
                        </a>
                    </Link>
                </Container>
            ) : null}
        </>
    );
};
