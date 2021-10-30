import React from 'react';

import { useDispatch } from 'react-redux';

import { SelectValue } from '../../../interfaces';
import { City } from '../../../state/entities/filters/filters.interface';
import { changeCityFilterAction } from '../../../state/entities/filters/filters.reducer';
import { useCityFiltersSelector } from '../../../state/entities/filters/filters.selector';
import Select from '../select/select';

const list = [
    { id: 'kyiv', value: 'kyiv' },
    { id: 'lviv', value: 'lviv' },
];

const CitySelect = (): JSX.Element => {
    const dispatch = useDispatch();
    const city = useCityFiltersSelector();

    const handleChange = (value: SelectValue): void => {
        dispatch(changeCityFilterAction(value.id as City));
    };

    return <Select value={{ id: city, value: city }} list={list} onChange={handleChange} />;
};

export default CitySelect;
