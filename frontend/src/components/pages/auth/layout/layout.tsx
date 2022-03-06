import React, { useEffect } from 'react';

import Home from '@mui/icons-material/Home';

import routes from '../../../../utils/routes';
import Link from '../../../common/link/link';
import RootLayout from '../../../layout/root-layout/root-layout';

import css from './layout.module.scss';

interface IProps {
    src: string;
    children: JSX.Element[] | JSX.Element;
}

const AuthLayout = ({ src, children }: IProps): JSX.Element => {
    useEffect(() => {
        document.querySelector('html')?.classList?.add('default');

        return () => {
            document.querySelector('html')?.classList?.remove('default');
        };
    }, []);

    return (
        <RootLayout className={css.main} withFooter={false}>
            <div className={css.root}>
                <img className={css.img} src={`/pages/auth/${src}.jpeg`} alt="" />
                <div className={css.wrp}>
                    <Link className={css.link} href={routes.home}>
                        <Home />
                        <span>Повернутись на головну</span>
                    </Link>
                    {children}
                </div>
            </div>
        </RootLayout>
    );
};

export default AuthLayout;
