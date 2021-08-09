import { useContext } from 'react';

import { Theme } from '../context/theme/theme';
import { Themes } from '../interfaces';

const useTheme = (): [theme: Themes, setTheme: (value: Themes) => void] => useContext(Theme);

export default useTheme;
