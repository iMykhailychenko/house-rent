import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import routes from '../../../utils/routes';
import Container from '../container/container';
import RootLayout from '../root-layout/root-layout';

import css from './private-layout.module.scss';

interface IProps {
    children: JSX.Element;
}

const PrivateLayout = ({ children }: IProps): JSX.Element => {
    const history = useRouter();

    return (
        <RootLayout withFooter={false}>
            <Container className={css.root} size="md">
                <nav>
                    <ul className={css.nav}>
                        <li>
                            <Link href={routes.private} shallow>
                                <a className={clsx(css.link, { [css.active]: history.pathname.includes(routes.private) })}>
                                    Особистий кабінет
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={routes.myPosts} shallow>
                                <a className={clsx(css.link, { [css.active]: history.pathname.includes(routes.myPosts) })}>
                                    Мої оголошення
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Container>
            {children}
        </RootLayout>
    );
};

export default PrivateLayout;
