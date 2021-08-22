import axios from 'axios';

const authInterceptor = axios.create();

authInterceptor.interceptors.request.use(
    config => config,
    error => {
        console.log(error);
    },
);

export default authInterceptor;
