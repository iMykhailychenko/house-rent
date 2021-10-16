import { toast } from 'react-toastify';

import errorText from '../../assets/errors';
import { IContent, LANGUAGE_ENUM } from '../../interfaces';

export const errorNotif = (error: Error, message = 'something_went_wrong'): void => {
    const lang = document.documentElement.lang as LANGUAGE_ENUM;
    const text = errorText[lang] as IContent;

    console.dir(error);
    toast.error(text[message], {
        theme: 'light',
        position: 'bottom-left',
        autoClose: 1000000_0000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
