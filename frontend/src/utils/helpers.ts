import cookie from 'cookie';

interface ParseCookieParams<T> {
    value?: string;
    key: string;
    isJson?: boolean;
    defaultValue: T;
}

export const parseCookie = <T>({ value = '', key, isJson = false, defaultValue }: ParseCookieParams<T>): T => {
    try {
        return isJson ? cookie.parse(value)[key] || defaultValue : JSON.parse(cookie.parse(value)[key]);
    } catch (error) {
        return defaultValue;
    }
};

export const addMonthToDate = (amount = 1): Date => {
    const today = new Date();
    return new Date(today.setMonth(today.getMonth() + amount));
};
