import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import clsx from 'clsx';
import Link from 'next/link';

import useTrans from '../../../../hooks/trans.hook';
import Container from '../../container/container';

import css from './sub-header.module.scss';

interface IProps {
    backBtnHref?: string;
    backBtnTitle?: string;
    onToggle: () => void;
}

const SubHeader = ({ onToggle, backBtnHref, backBtnTitle = 'На главную' }: IProps): JSX.Element => {
    const trans = useTrans();

    return (
        <>
            <Container id="subheader" className={css.subHeader} size="md">
                <>
                    <div className={css.inner}>
                        {backBtnHref ? (
                            <Link href={backBtnHref}>
                                <a className={css.link}>
                                    <ArrowBackIosIcon />
                                    <span>{trans(backBtnTitle)}</span>
                                </a>
                            </Link>
                        ) : null}
                    </div>
                    <div className={clsx(css.inner, css.center)}>
                        <button className={css.btn} type="button" onClick={onToggle}>
                            <KeyboardArrowDownOutlinedIcon />
                        </button>
                    </div>
                    <div className={css.inner} />
                </>
            </Container>
        </>
    );
};

export default SubHeader;
