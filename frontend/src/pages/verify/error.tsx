import React, { useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Button from '../../components/common/button/button';
import Link from '../../components/common/link/link';
import loginModal from '../../components/common/modal/modals/login-modal/login-modal';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { sendNewEmail } from '../../state/entities/profile/profile.thunk';
import routes from '../../utils/routes';
import { withStore } from '../../utils/ssr';

import css from './verify.module.scss';

const ErrorVerifyPage = (): JSX.Element => {
    const [auth] = useAuth();
    const history = useRouter();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const handleEmail = async (): Promise<void> => {
        try {
            setLoading(true);
            await dispatch(sendNewEmail());
            history.push(routes.home);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Meta />
            <RootLayout withFooter={false} className={css.root}>
                <Container className={css.inner} size="sm">
                    <Link className={css.toHome} primary href={routes.home}>
                        <ArrowBackIosIcon />
                        <span>Повернутись на головну</span>
                    </Link>
                    <div className={css.error}>
                        <h2>Виникла помилка верифікації електронної пошти</h2>
                        <p>Можливо термін дії посилання вже закінчився. Спробуйте авторизуватись та надіслати лист повторно</p>
                        {auth?.accessToken ? (
                            <Button loading={loading} primary onClick={handleEmail}>
                                Надіслати лист повторно
                            </Button>
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

export default ErrorVerifyPage;
