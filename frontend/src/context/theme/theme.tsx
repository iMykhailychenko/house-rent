import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import { Themes } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers';

export const Theme = createContext<[theme: Themes, setTheme: (v: Themes) => void]>(['white', () => undefined]);

interface IProps {
    serverTheme?: Themes;
    children: ReactElement;
}

const ThemeProvider = ({ children, serverTheme = 'white' }: IProps): ReactElement => {
    const [theme, setTheme] = useState<Themes>(serverTheme || 'white');

    useEffect(() => {
        if (process.browser && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add(theme);
        }
    }, [theme]);

    const handleTheme = (value: Themes): void => {
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
