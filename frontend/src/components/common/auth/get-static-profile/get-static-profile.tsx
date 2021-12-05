import React, { ReactNode, useEffect } from 'react';

import useAuth from '../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { profileInfoThunk } from '../../../../state/entities/profile/profile.thunk';

interface IProps {
    children: ReactNode;
}

const GetStaticProfile = ({ children }: IProps): JSX.Element => {
    const { token } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token.accessToken) {
            dispatch(profileInfoThunk());
        }
    }, [token.accessToken, dispatch]);

    return <>{children}</>;
};

export default GetStaticProfile;
