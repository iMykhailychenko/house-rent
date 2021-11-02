import { ToastOptions } from 'react-toastify/dist/types';

const toastConfig: ToastOptions = {
    theme: 'light',
    position: 'bottom-left',
    autoClose: 5_000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export default toastConfig;
