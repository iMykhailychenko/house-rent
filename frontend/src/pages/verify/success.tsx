import React from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Button from '../../components/common/button/button';
import Link from '../../components/common/link/link';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { useRole } from '../../hooks/role.hook';
import { sendRestorePasswordEmailThunk } from '../../state/entities/auth/auth.thunk';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import routes from '../../utils/routes';
import { withStore } from '../../utils/ssr';

import css from './verify.module.scss';

const ConfettiWrp = dynamic(() => import('../../components/common/confetti/confetti'), { ssr: false });

const SuccessVerifyPage = (): JSX.Element => {
    const role = useRole();
    const [auth] = useAuth();
    const dispatch = useAppDispatch();
    const profileData = useProfileInfoSelector();

    const history = useRouter();
    const type = String(history.query.type || 'confirm-email');

    const handleChangePassword = (): void => {
        dispatch(sendRestorePasswordEmailThunk({ email: profileData.data.email }));
    };

    const renderActionBtn = (): JSX.Element =>
        auth?.accessToken ? (
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
            <Link type="button" primary href={routes.auth.login}>
                Авторизуватись
            </Link>
        );

    const pageTypeMap: { [key: string]: JSX.Element } = {
        'confirm-email': (
            <>
                <h2>Ви успішно верифікували вашу електронну пошту!</h2>
                <p>Тепер ви можете користуватись сайтом без обмежень</p>
                {renderActionBtn()}
            </>
        ),
        'change-email': (
            <>
                <h2>Ви успішно змінили та верифікували вашу електронну пошту!</h2>
                <p>Тепер ви можете використовувати нову електронну пошту для авторизації</p>
                {renderActionBtn()}
            </>
        ),
        'recover-email': (
            <>
                <h2>Ви успішно відновили вашу електронну пошту.</h2>
                <p>Ми рекомендуємо вам терміново змінити пароль на сайті!</p>
                {auth?.accessToken ? (
                    <Button primary onClick={handleChangePassword}>
                        Змінити пароль
                    </Button>
                ) : (
                    <Link type="button" primary href={routes.auth.reset}>
                        Змінити пароль
                    </Link>
                )}
            </>
        ),
    };

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
                    <div className={css.success}>{pageTypeMap[type]}</div>
                </Container>
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default SuccessVerifyPage;
