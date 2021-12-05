import React, { createContext, useState } from 'react';

import Cookies from 'js-cookie';

import appConfig from '../../config/app.config';
import { HOUSE_RENT_CONFIG } from '../../constant/cookie.constant';
import { IConfig } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers/date.helper';

export type IConfigValue = [config: IConfig, setConfig: (value: IConfig) => void];
export const Config = createContext<IConfigValue>([appConfig, () => undefined]);

interface IProps {
    initValue?: IConfig;
    children: JSX.Element | JSX.Element[];
}

const ConfigProvider = ({ children, initValue = appConfig }: IProps): JSX.Element => {
    const [config, setConfig] = useState<IConfig>(initValue);
    const handleConfig = (data: IConfig): void => {
        try {
            Cookies.set(HOUSE_RENT_CONFIG, JSON.stringify(data), { expires: addMonthToDate(1) });
            setConfig(data);
        } catch (error) {
            setConfig(appConfig);
            console.dir(error);
        }
    };
    return <Config.Provider value={[config, handleConfig]}>{children}</Config.Provider>;
};

export default ConfigProvider;
