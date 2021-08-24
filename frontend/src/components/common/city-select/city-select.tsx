import React, { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import { SelectValue } from '../../../interfaces';
import { City } from '../../../state/entities/filters/filters.interface';
import { changeCityFiltersAction } from '../../../state/entities/filters/filters.reducer';
import { useCityFiltersSelector } from '../../../state/entities/filters/filters.selector';
import Select from '../select/select';

const list = [
    { id: 'kyiv', value: 'kyiv' },
    { id: 'lviv', value: 'lviv' },
];

const CitySelect = (): ReactElement => {
    const dispatch = useDispatch();
    const city = useCityFiltersSelector();

    const handleChange = (value: SelectValue): void => {
        dispatch(changeCityFiltersAction(value.id as City));
    };

    return <Select placeholder="test" value={{ id: city, value: city }} list={list} onChange={handleChange} />;
};

export default CitySelect;
