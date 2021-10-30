import React from 'react';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import Cookies from 'js-cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import Link from '../../../components/common/link/link';
import Container from '../../../components/layout/container/container';
import { parseCookie } from '../../../utils/helpers';
import routes from '../../../utils/routes';
import { withAuthRedirect } from '../../../utils/ssr';

import css from './success.module.scss';

const TentComponent = dynamic(() => import('../../../apps/sea'));

const AuthSuccessPage = (): JSX.Element => {
    Cookies.remove('show_success_page');
    return (
        <>
            <TentComponent />
            <Container className={css.root} size="sm">
                <h2>Ви успішно зареєструвались на сайті.</h2>
                <p>
                    Ми надіслали вам листа на електронну пошту. Перейдіть за посилланням щоб остаточно закінчити процес реєстрації
                </p>
                <div className={css.flex}>
                    <Link className={css.link} href={routes.home}>
                        <HomeIcon />
                        <span>Перейти на головну</span>
                    </Link>
                    <Link className={css.link} href={routes.auth.login}>
                        <ExitToAppIcon />
                        <span>Увійти в особистий кабінет</span>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(
    async (ctx: GetServerSidePropsContext): Promise<{ redirect: boolean } | void> => {
        const pageState = parseCookie<{ openPage: boolean }>({
            key: 'show_success_page',
            value: ctx?.req?.headers?.cookie,
            defaultValue: { openPage: false },
        });

        if (!pageState.openPage) {
            return { redirect: true };
        }
    },
    true,
);

export default AuthSuccessPage;
