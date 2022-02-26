import React from 'react';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';

import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import routes from '../../utils/routes';

import css from './new.module.scss';

const NewItemPage = (): JSX.Element => {
    return (
        <GetStaticProfile>
            <Meta />
            <RootLayout withFooter={false} href={routes.home}>
                <Container size="md">
                    <ul className={css.list}>
                        <li>
                            <CSSTransition in timeout={200} appear>
                                <Link href={routes.posts.new}>
                                    <a className={css.link}>
                                        <p>Я шукаю квартиру</p>
                                        <ArrowForwardOutlinedIcon />
                                    </a>
                                </Link>
                            </CSSTransition>
                        </li>
                        <li>
                            <CSSTransition in timeout={300} appear>
                                <Link href={routes.posts.new}>
                                    <a className={css.link}>
                                        <p>Я допоможу знайти кватиру</p>
                                        <ArrowForwardOutlinedIcon />
                                    </a>
                                </Link>
                            </CSSTransition>
                        </li>
                        <li>
                            <CSSTransition in timeout={400} appear>
                                <Link href={routes.posts.new}>
                                    <a className={css.link}>
                                        <p>Я проконсультую. Юридичні питання, оцінка якості ремонту тощо</p>
                                        <ArrowForwardOutlinedIcon />
                                    </a>
                                </Link>
                            </CSSTransition>
                        </li>
                    </ul>
                </Container>
            </RootLayout>
        </GetStaticProfile>
    );
};

export default NewItemPage;
