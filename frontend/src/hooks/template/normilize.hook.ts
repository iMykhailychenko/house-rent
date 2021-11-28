import { useCallback } from 'react';

import { TemplateDataType } from '../../components/pages/posts/new/new-post-form/new-post-form';
import useMinMaxPrice from '../min-max-price.hook';
import useMinMaxRoom from '../min-max-room.hook';
import useTrans from '../trans.hook';

import { NormalizedFilters } from './get-template.hook';

type NormalizeFilters = (data: TemplateDataType) => NormalizedFilters;
const useNormalizeFilters = (): NormalizeFilters => {
    const trans = useTrans();

    const minMaxRooms = useMinMaxRoom();
    const minMaxPrice = useMinMaxPrice();

    return useCallback(
        ({
            pets,
            children,
            firstName: user,
            cityFilters,
            roomFilters,
            priceFilters,
            districtFilters,
            residentsAmount,
            houseTypeFilters,
        }: TemplateDataType) => {
            const room = minMaxRooms(roomFilters);
            const price = minMaxPrice(priceFilters);

            return {
                user,
                room,
                price,
                city: trans(cityFilters),
                metro: cityFilters === 'kyiv' ? trans('near_metro') : '',
                residents: +residentsAmount === 1 ? trans('single') : trans('with_hwo'),
                houseType: houseTypeFilters.length ? trans('in_' + houseTypeFilters.join('_')) : '[...]',
                district: districtFilters.length ? districtFilters.map(dist => trans(dist)).join(', ') : '[...]',
                pets: pets ? `[${trans('pets').toLowerCase()}: ${pets}]` : trans('no_pets').toLowerCase(),
                children: children ? `[${trans('children').toLowerCase()}: ${children}]` : trans('no_children').toLowerCase(),
            };
        },
        [minMaxPrice, minMaxRooms, trans],
    );
};

export default useNormalizeFilters;
