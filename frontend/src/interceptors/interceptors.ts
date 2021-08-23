import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { Dispatch } from 'redux';

import { logoutAction } from '../state/entities/auth/auth.reducer';

const interceptor = (dispatch: Dispatch): void => {
    axios.interceptors.request.use(AxiosLogger.requestLogger, error => Promise.reject(error));
    axios.interceptors.response.use(AxiosLogger.responseLogger, error => {
        if (error?.response?.status === 401) {
            delete axios.defaults.headers.common.Authorization;
            dispatch(logoutAction());
        }

        return Promise.reject(error);
    });
};

export default interceptor;
