import React, { createContext, ReactElement, useState } from 'react';

import { getAllChipsFilters } from '../../config/filters.config';
import { ISearchFilters } from '../../interfaces';

type IContextFilterValue = [value: ISearchFilters, setValue: (value: ISearchFilters) => void];

const defaultValue = getAllChipsFilters();
export const Filters = createContext<IContextFilterValue>([defaultValue, () => undefined]);

interface IProps {
    value?: ISearchFilters;
    children: JSX.Element | JSX.Element[] | ReactElement;
}

const FiltersProvider = ({ children, value = defaultValue }: IProps): ReactElement => {
    const [appFilters, setAppFilters] = useState<ISearchFilters>(value);

    const handleConfig = (filters: ISearchFilters): void => {
        try {
            console.log(filters);
            setAppFilters(filters);
        } catch (error) {
            console.dir(error);
        }
    };
    return <Filters.Provider value={[appFilters, handleConfig]}>{children}</Filters.Provider>;
};

export default FiltersProvider;
