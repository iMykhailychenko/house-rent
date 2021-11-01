import { toast } from 'react-toastify';

import errorText from '../../assets/errors';
import toastConfig from '../../config/toast.cofig';
import { IContent, LANGUAGE_ENUM } from '../../interfaces';

export const errorNotif = (error: Error, message = 'something_went_wrong'): void => {
    const lang = document.documentElement.lang as LANGUAGE_ENUM;
    const text = errorText[lang] as IContent;

    console.dir(error);
    toast.error(text[message], toastConfig);
};
