import React, { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import useTrans from '../../../../../../hooks/trans.hook';
import { SEARCH_FILTERS } from '../../../../../../state/entities/filters/filters.interface';
import {
    changeDistrictFiltersAction,
    changeGeneralFiltersAction,
    changeHouseTypeFiltersAction,
    changePriceFiltersAction,
    changeRoomFiltersAction,
    clearAllFiltersAction,
} from '../../../../../../state/entities/filters/filters.reducer';
import { useAllFiltersSelector } from '../../../../../../state/entities/filters/filters.selector';
import Button from '../../../../../common/button/button';
import Chips from '../../../../../common/chips/chips';
import CitySelect from '../../../../../common/city-select/city-select';

import css from './home-post-chips.module.scss';

const HomePostChips = (): ReactElement => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const filters = useAllFiltersSelector();

    const handleChangeGeneral = (value: string[]): void => {
        dispatch(changeGeneralFiltersAction(value));
    };
    const handleChangeRoom = (value: string[]): void => {
        dispatch(changeRoomFiltersAction(value));
    };
    const handleChangeHouseType = (value: string[]): void => {
        dispatch(changeHouseTypeFiltersAction(value));
    };
    const handleChangePrice = (value: string[]): void => {
        dispatch(changePriceFiltersAction(value));
    };
    const handleChangeDistrict = (value: string[]): void => {
        dispatch(changeDistrictFiltersAction(value));
    };
    const handleClearAll = (): void => {
        dispatch(clearAllFiltersAction());
    };

    return (
        <div className={css.root}>
            <Chips onChange={handleChangeGeneral} chips={filters[SEARCH_FILTERS.GENERAL]} />

            <h4 className={css.title}>{trans('Оберіть ваше місто')}</h4>
            <CitySelect />

            <h4 className={css.title}>{trans('Оберіть район')}</h4>
            <Chips onChange={handleChangeDistrict} chips={filters[SEARCH_FILTERS.DISTRICT]} />

            <h4 className={css.title}>{trans('Кількість кімнат')}</h4>
            <Chips onChange={handleChangeRoom} chips={filters[SEARCH_FILTERS.ROOM]} />

            <h4 className={css.title}>{trans('Тип будинку')}</h4>
            <Chips onChange={handleChangeHouseType} chips={filters[SEARCH_FILTERS.HOUSE_TYPE]} />

            <h4 className={css.title}>{trans('Цінова категорія')}</h4>
            <Chips onChange={handleChangePrice} chips={filters[SEARCH_FILTERS.PRICE]} />

            <div className={css.flex}>
                <Button onClick={handleClearAll} secondary>
                    {trans('Очистити')}
                </Button>
                <Button primary>{trans('Пошук')}</Button>
            </div>
        </div>
    );
};

export default HomePostChips;
