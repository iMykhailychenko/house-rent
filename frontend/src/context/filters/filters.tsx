import Cookies from 'js-cookie';
import React, { createContext, ReactElement, useState } from 'react';

import { IConfig } from '../../interfaces';
import { addMonthToDate } from '../../utils/helpers';
import { IConfigValue } from '../config/config';

export const Filters = createContext<IConfigValue>([{}, () => undefined]);

interface IProps {
    value?: IConfig;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const FiltersProvider = ({ children, value = siteFilters }: IProps): ReactElement => {
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
    return <Filters.Provider value={[config, handleConfig]}>{children}</Filters.Provider>;
};

export default FiltersProvider;
