import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import SegmentedControl from '../../components/common/segmented-control/segmented-control';
import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import MyPostsList from '../../components/pages/my-posts/my-posts';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { POST_STATUS } from '../../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../../state/entities/posts/thunks/personal-posts.thunk';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import routes from '../../utils/routes';

import css from './my-posts.module.scss';

const tabs = [
    { id: POST_STATUS.DRAFT, name: POST_STATUS.DRAFT },
    { id: POST_STATUS.ACTIVE, name: POST_STATUS.ACTIVE },
    { id: POST_STATUS.ARCHIVE, name: POST_STATUS.ARCHIVE },
];

const MyPostsPage = (): JSX.Element => {
    const { token } = useAuth();
    const dispatch = useAppDispatch();
    const profile = useProfileInfoSelector();

    const history = useRouter();
    const status = String(history.query.status || POST_STATUS.ACTIVE) as POST_STATUS;

    useEffect(() => {
        if (token.accessToken) {
            dispatch(personalPostsListThunk({ status, page: 1 }));
        }
    }, [token.accessToken, dispatch, profile.data.id, status]);

    const handleTabChange = (value: string): void => {
        history.push(`${routes.myPosts}?status=${value}`);
    };

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <PrivateLayout>
                    <Container size="lg">
                        <SegmentedControl className={css.control} active={status} onChange={handleTabChange} value={tabs} />
                        <>{token.accessToken ? <MyPostsList /> : null}</>
                    </Container>
                </PrivateLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default MyPostsPage;
