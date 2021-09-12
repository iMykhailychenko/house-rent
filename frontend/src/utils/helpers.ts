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

export const cutString = (str: string, len: number): string => (str.length < len ? str : str.slice(0, len - 3) + '...');

export const copyText = async (text: string): Promise<void> => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    paragraph.style.opacity = '0';
    paragraph.style.fontSize = '0';
    document.body.insertAdjacentElement('beforeend', paragraph);

    try {
        const selection = window.getSelection();
        const range = document.createRange();

        range.selectNodeContents(paragraph);
        selection?.removeAllRanges();
        selection?.addRange(range);

        document.execCommand('copy');
        selection?.removeAllRanges();
    } catch (e) {
        throw new Error();
    } finally {
        paragraph.remove();
    }
};
