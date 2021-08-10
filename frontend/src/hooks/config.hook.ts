import { useContext } from 'react';

import { Config, IConfigValue } from '../context/config/config';

const useConfig = (): IConfigValue => useContext(Config);

export default useConfig;
