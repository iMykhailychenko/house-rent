import { useContext } from 'react';

import { Theme } from '../context/theme/theme';
import { THEME_ENUM } from '../interfaces';

const useTheme = (): [theme: THEME_ENUM, setTheme: (value: THEME_ENUM) => void] => useContext(Theme);

export default useTheme;
