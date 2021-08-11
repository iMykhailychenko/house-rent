import React, { ReactElement, useState } from 'react';

import useTrans from '../../../../../../context/trans/trans';
import Chips, { IChips, IChipsMap } from '../../../../../common/chips/chips';
import { generalFilters, houseTypeFilters, priceFilters, roomsFilters } from './home-post-chips.config';
import css from './home-post-chips.module.scss';

const HomePostChips = (): ReactElement => {
    const trans = useTrans();
    const [generalChips, setGeneralChips] = useState<IChipsMap>(generalFilters(['hot']));
    const [roomsChips, setRoomsChips] = useState<IChipsMap>(roomsFilters([]));
    const [houseTypeChips, setHouseTypeChips] = useState<IChipsMap>(houseTypeFilters([]));
    const [priceChips, setPriceChips] = useState<IChipsMap>(priceFilters([]));

    const handleGeneralChips = (value: IChips): void => {
        setGeneralChips(prev => ({ ...prev, [value.name]: value }));
    };
    const handleRoomsChips = (value: IChips): void => {
        setRoomsChips(prev => ({ ...prev, [value.name]: value }));
    };
    const handleHouseTypeChips = (value: IChips): void => {
        setHouseTypeChips(prev => ({ ...prev, [value.name]: value }));
    };
    const handlePriceChips = (value: IChips): void => {
        setPriceChips(prev => ({ ...prev, [value.name]: value }));
    };

    return (
        <div className={css.root}>
            <Chips onChange={handleGeneralChips} chips={generalChips} />

            <h4 className={css.title}>{trans('Кількість кімнат')}</h4>
            <Chips onChange={handleRoomsChips} chips={roomsChips} />

            <h4 className={css.title}>{trans('Тип будинку')}</h4>
            <Chips onChange={handleHouseTypeChips} chips={houseTypeChips} />

            <h4 className={css.title}>{trans('Цінова категорія')}</h4>
            <Chips onChange={handlePriceChips} chips={priceChips} />
        </div>
    );
};

export default HomePostChips;
