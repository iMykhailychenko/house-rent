import React, { createContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { THEME_ENUM } from '../../interfaces';
import { addYearToDate } from '../../utils/helpers/date.helper';

export const Theme = createContext<[theme: THEME_ENUM, setTheme: (v: THEME_ENUM) => void]>([THEME_ENUM.WHITE, () => undefined]);

interface IProps {
    initValue?: THEME_ENUM;
    children: JSX.Element;
}

const ThemeProvider = ({ children, initValue = THEME_ENUM.WHITE }: IProps): JSX.Element => {
    const [theme, setTheme] = useState<THEME_ENUM>(initValue || 'white');

    useEffect(() => {
        const ref = document.querySelector('html');
        if (process.browser && ref) {
            ref.classList.add(theme);
        }
    }, [theme]);

    const handleTheme = (value: THEME_ENUM): void => {
        try {
            Cookies.set('house_rent_theme', value, { expires: addYearToDate(1) });
            const ref = document.querySelector('html');
            if (ref) {
                ref.classList.remove('default');
                ref.classList.remove(theme);
                ref.classList.add(value);
            }
            setTheme(value);
        } catch (error) {
            console.dir(error);
        }
    };
    return <Theme.Provider value={[theme, handleTheme]}>{children}</Theme.Provider>;
};

export default ThemeProvider;
