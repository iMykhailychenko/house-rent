import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useState } from 'react';

import siteConfig from '../../config/site.config';
import { IConfig } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers';

export type IConfigValue = [config: IConfig, setConfig: (value: IConfig) => void];
export const Config = createContext<IConfigValue>([siteConfig, () => undefined]);

interface IProps {
    value?: IConfig;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const ConfigProvider = ({ children, value = siteConfig }: IProps): ReactElement => {
    const [config, setConfig] = useState<IConfig>(value);
    const handleConfig = (data: IConfig): void => {
        try {
            Cookies.set('house_rent_config', JSON.stringify(data), { expires: addMonthToDate(1) });
            setConfig(data);
        } catch (error) {
            setConfig(siteConfig);
            console.dir(error);
        }
    };
    return <Config.Provider value={[config, handleConfig]}>{children}</Config.Provider>;
};

export default ConfigProvider;
