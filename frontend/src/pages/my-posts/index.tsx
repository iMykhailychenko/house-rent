import React, { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import SegmentedControl from '../../components/common/segmented-control/segmented-control';
import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import MyPostsList from '../../components/pages/my-posts/my-posts';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { POST_STATUS } from '../../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../../state/entities/posts/thunks/personal-posts.thunk';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import routes from '../../utils/routes';
import { withAuthRedirect } from '../../utils/ssr';

import css from './my-posts.module.scss';

const tabs = [
    { id: POST_STATUS.DRAFT, name: POST_STATUS.DRAFT },
    { id: POST_STATUS.ACTIVE, name: POST_STATUS.ACTIVE },
    { id: POST_STATUS.ARCHIVE, name: POST_STATUS.ARCHIVE },
];

const MyPosts = (): JSX.Element => {
    const [auth] = useAuth();
    const dispatch = useAppDispatch();
    const profile = useProfileInfoSelector();

    const history = useRouter();
    const status = String(history.query.status || POST_STATUS.DRAFT) as POST_STATUS;

    useEffect(() => {
        if (auth?.accessToken) {
            dispatch(personalPostsListThunk({ status, page: 1 }));
        }
    }, [auth?.accessToken, dispatch, profile.data.id, status]);

    const handleTabChange = (value: string): void => {
        history.push(`${routes.myPosts}?status=${value}`);
    };

    return (
        <PrivateLayout>
            <Container size="lg">
                <SegmentedControl className={css.control} active={status} onChange={handleTabChange} value={tabs} />
                <>{auth?.accessToken ? <MyPostsList /> : null}</>
            </Container>
        </PrivateLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default MyPosts;
