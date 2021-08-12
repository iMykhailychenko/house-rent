import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import useTrans from '../../../../../../hooks/trans.hook';
import { SEARCH_FILTERS } from '../../../../../../interfaces';
import {
    changeCityFiltersAction,
    changeGeneralFiltersAction,
    changeHouseTypeFiltersAction,
    changePriceFiltersAction,
    changeRoomFiltersAction,
} from '../../../../../../state/entities/filters/filters.reducer';
import { useAllFiltersSelector } from '../../../../../../state/entities/filters/filters.selector';
import Chips from '../../../../../common/chips/chips';
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
    const handleChangeCity = (value: string[]): void => {
        dispatch(changeCityFiltersAction(value));
    };

    return (
        <div className={css.root}>
            <Chips onChange={handleChangeGeneral} chips={filters[SEARCH_FILTERS.GENERAL]} />

            <h4 className={css.title}>{trans('Кількість кімнат')}</h4>
            <Chips onChange={handleChangeRoom} chips={filters[SEARCH_FILTERS.ROOM]} />

            <h4 className={css.title}>{trans('Тип будинку')}</h4>
            <Chips onChange={handleChangeHouseType} chips={filters[SEARCH_FILTERS.HOUSE_TYPE]} />

            <h4 className={css.title}>{trans('Цінова категорія')}</h4>
            <Chips onChange={handleChangePrice} chips={filters[SEARCH_FILTERS.PRICE]} />

            <h4 className={css.title}>{trans('Оберіть місто')}</h4>
            <Chips onChange={handleChangeCity} chips={filters[SEARCH_FILTERS.CITY]} />
        </div>
    );
};

export default HomePostChips;
