import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import Button from '../../components/common/button/button';
import Link from '../../components/common/link/link';
import loginModal from '../../components/common/modal/modals/login-modal/login-modal';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import useAuth from '../../hooks/auth.hook';
import { useRole } from '../../hooks/role.hook';
import routes from '../../utils/routes';
import { withStore } from '../../utils/ssr';

import css from './verify.module.scss';

const ConfettiWrp = dynamic(() => import('../../components/common/confetti/confetti'), { ssr: false });

const SuccessVerifyPage = (): JSX.Element => {
    const [auth] = useAuth();
    const role = useRole();

    return (
        <>
            <Meta />
            <ConfettiWrp />
            <RootLayout withFooter={false} className={css.root}>
                <Container className={css.inner} size="sm">
                    <Link className={css.toHome} primary href={routes.home}>
                        <ArrowBackIosIcon />
                        <span>Повернутись на головну</span>
                    </Link>
                    <div className={css.success}>
                        <h2>Ви успішно верифікували вашу електронну пошту!</h2>
                        <p>Тепер ви можете користуватись сайтом без обмежень</p>
                        {auth?.accessToken ? (
                            role.isUser ? (
                                <Link type="button" primary href={routes.posts.new}>
                                    Створити оголошення
                                </Link>
                            ) : (
                                <Link type="button" primary href={routes.private}>
                                    Перейти в особистий кабінет
                                </Link>
                            )
                        ) : (
                            <Button primary onClick={loginModal}>
                                Авторизуватись
                            </Button>
                        )}
                    </div>
                </Container>
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default SuccessVerifyPage;
