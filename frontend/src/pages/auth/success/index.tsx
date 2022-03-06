import React, { useEffect } from 'react';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

import Link from '../../../components/common/link/link';
import Container from '../../../components/layout/container/container';
import RootLayout from '../../../components/layout/root-layout/root-layout';
import Meta from '../../../components/meta/meta';
import { SHOW_SUCCESS_PAGE } from '../../../constant/cookie.constant';
import routes from '../../../utils/routes';

import css from './success.module.scss';

const SeaComponent = dynamic(() => import('../../../apps/sea'));
const ConfettiWrp = dynamic(() => import('../../../components/common/confetti/confetti'), { ssr: false });

const AuthSuccessPage = (): JSX.Element => {
    useEffect(() => {
        Cookies.remove(SHOW_SUCCESS_PAGE);
        document.querySelector('html')?.classList?.add('default');

        return () => {
            document.querySelector('html')?.classList?.remove('default');
        };
    }, []);

    return (
        <>
            <Meta />
            <RootLayout withFooter={false}>
                <ConfettiWrp />
                <SeaComponent />
                <Container className={css.root} size="sm">
                    <h2>Ви успішно зареєструвались на сайті.</h2>
                    <p>
                        Ми надіслали вам листа на електронну пошту. Перейдіть за посилланням в ньому щоб остаточно закінчити
                        процес реєстрації
                    </p>
                    <div className={css.flex}>
                        <Link className={css.link} type="button" secondary href={routes.auth.login}>
                            <ExitToAppIcon />
                            <span>Увійти в особистий кабінет</span>
                        </Link>
                    </div>
                </Container>
            </RootLayout>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = withAuthRedirect(
//     async (ctx: GetServerSidePropsContext): Promise<{ redirect: boolean } | void> => {
//         const pageState = parseCookie<{ openPage: boolean }>({
//             key: 'show_success_page',
//             value: ctx?.req?.headers?.cookie,
//             defaultValue: { openPage: false },
//         });
//
//         if (!pageState.openPage) {
//             return { redirect: true };
//         }
//     },
//     true,
// );

export default AuthSuccessPage;
