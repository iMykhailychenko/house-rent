import { useRouter } from 'next/router';

import locales from '../assets/translations';
import { ILocales, LANGUAGE_ENUM } from '../interfaces';

type UseTransType = (value?: string) => string;

const useTrans = (): UseTransType => {
    const router = useRouter();
    return (value?: string): string => {
        return (locales as ILocales)[router?.locale || LANGUAGE_ENUM.UA][value || ''] || String(value || '');
    };
};

export default useTrans;
