import React, { createContext, ReactElement, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { THEME_ENUM } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers';

export const Theme = createContext<[theme: THEME_ENUM, setTheme: (v: THEME_ENUM) => void]>([THEME_ENUM.WHITE, () => undefined]);

interface IProps {
    serverTheme?: THEME_ENUM;
    children: ReactElement;
}

const ThemeProvider = ({ children, serverTheme = THEME_ENUM.WHITE }: IProps): ReactElement => {
    const [theme, setTheme] = useState<THEME_ENUM>(serverTheme || 'white');

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(theme);
        }
    }, [theme]);

    const handleTheme = (value: THEME_ENUM): void => {
        try {
            Cookies.set('house_rent_theme', value, { expires: addMonthToDate(1) });
            if (document.querySelector('html')) {
                document.querySelector('html')?.classList?.remove(theme);
                document.querySelector('html')?.classList?.add(value);
            }
            setTheme(value);
        } catch (error) {
            console.dir(error);
        }
    };
    return <Theme.Provider value={[theme, handleTheme]}>{children}</Theme.Provider>;
};

export default ThemeProvider;
