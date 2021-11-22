import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useProfileInfoSelector } from '../../../state/entities/profile/profile.selector';
import routes from '../../../utils/routes';
import Button from '../../common/button/button';
import UserAvatar from '../../common/user/user-avatar/user-avatar';
import Container from '../container/container';
import RootLayout from '../root-layout/root-layout';

import css from './private-layout.module.scss';

interface IProps {
    children: JSX.Element;
}

const PrivateLayout = ({ children }: IProps): JSX.Element => {
    const history = useRouter();
    const profileData = useProfileInfoSelector();

    const redirectProfile = () => {
        history.push(routes.private);
    };

    const redirectNewPost = () => {
        history.push(routes.posts.new);
    };

    return (
        <RootLayout withFooter={false}>
            <Container className={css.top} size="md">
                <div className={css.flex}>
                    <button className={css.profile} type="button" onClick={redirectProfile}>
                        <UserAvatar
                            src={profileData.data?.avatar}
                            firstName={profileData.data.firstName}
                            lastName={profileData.data.lastName}
                        />
                        <div className={css.inner}>
                            <h3 className={css.title}>{`${profileData.data.firstName} ${profileData.data.lastName}`}</h3>
                            <p className={css.text}>{profileData.data.email}</p>
                        </div>
                    </button>

                    <Button primary onClick={redirectNewPost}>
                        Створити оголошення
                    </Button>
                </div>
            </Container>
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
