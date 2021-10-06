import React, { ReactElement, useState } from 'react';

import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { SEARCH_FILTERS } from '../../../../state/entities/filters/filters.interface';
import {
    changeDistrictFilterAction,
    changeGeneralFilterAction,
    changeHouseTypeFilterAction,
    changeInputFilterAction,
    changePriceFilterAction,
    changeRoomFilterAction,
    clearAllFilterAction,
} from '../../../../state/entities/filters/filters.reducer';
import { useAllFiltersSelector } from '../../../../state/entities/filters/filters.selector';
import Button from '../../button/button';
import CardSizeSwitcher from '../../card-size-switcher/card-size-switcher';
import Chips from '../../chips/chips';
import CitySelect from '../../city-select/city-select';
import SearchInput from '../../search-input/search-input';

import css from './post-filters.module.scss';

interface IProps {
    onSubmit: () => void;
}

const PostFilters = ({ onSubmit }: IProps): ReactElement => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const filters = useAllFiltersSelector();
    const [showFilters, setShowFilters] = useState(false);
    const toggleShowFilters = (): void => setShowFilters(prev => !prev);

    const handleChangeInput = (value: string): void => {
        dispatch(changeInputFilterAction(value));
    };
    const handleChangeGeneral = (value: string[]): void => {
        dispatch(changeGeneralFilterAction(value));
    };
    const handleChangeRoom = (value: string[]): void => {
        dispatch(changeRoomFilterAction(value));
    };
    const handleChangeHouseType = (value: string[]): void => {
        dispatch(changeHouseTypeFilterAction(value));
    };
    const handleChangePrice = (value: string[]): void => {
        dispatch(changePriceFilterAction(value));
    };
    const handleChangeDistrict = (value: string[]): void => {
        dispatch(changeDistrictFilterAction(value));
    };
    const handleClearAll = (): void => {
        dispatch(clearAllFilterAction());
        onSubmit();
    };
    const submit = (): void => {
        onSubmit();
    };

    return (
        <>
            <CardSizeSwitcher />

            <div className={css.root}>
                <h4 className={css.title}>{trans('Шукати оголошення')}</h4>
                <SearchInput
                    value={filters[SEARCH_FILTERS.QUERY]}
                    placeholder="Введіть пошуковий запит"
                    onChange={handleChangeInput}
                    onSubmit={submit}
                />

                <h4 className={css.title}>{trans('Оберіть ваше місто')}</h4>
                <CitySelect />

                <h4 className={css.title}>{trans('Терміново потрібна квартира')}</h4>
                <Chips onChange={handleChangeGeneral} chips={filters[SEARCH_FILTERS.GENERAL]} />

                <h4 className={css.title}>{trans('Цінова категорія')}</h4>
                <Chips onChange={handleChangePrice} chips={filters[SEARCH_FILTERS.PRICE]} />

                {showFilters && (
                    <>
                        <h4 className={css.title}>{trans('Кількість кімнат')}</h4>
                        <Chips onChange={handleChangeRoom} chips={filters[SEARCH_FILTERS.ROOM]} />

                        <h4 className={css.title}>{trans('Тип будинку')}</h4>
                        <Chips onChange={handleChangeHouseType} chips={filters[SEARCH_FILTERS.HOUSE_TYPE]} />

                        <h4 className={css.title}>{trans('Оберіть район')}</h4>
                        <Chips onChange={handleChangeDistrict} chips={filters[SEARCH_FILTERS.DISTRICT]} />
                    </>
                )}

                <button className={css.link} onClick={toggleShowFilters} type="button">
                    {showFilters ? <VisibilityOff /> : <Visibility />}
                    <span>{showFilters ? 'Приховати фільтри' : 'Показати більше фільтрів'}</span>
                </button>

                <div className={css.flex}>
                    <Button onClick={handleClearAll} secondary>
                        {trans('Очистити')}
                    </Button>
                    <Button onClick={submit} primary>
                        {trans('Пошук')}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default PostFilters;
