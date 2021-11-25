import { TransFn } from '../../../../../interfaces';

import { TemplateDataType } from './new-post-form';

interface NormalizedFilters {
    user: string;
    pets: string;
    room: string;
    city: string;
    price: string;
    metro: string;
    district: string;
    children: string;
    residents: string;
    houseType: string;
}

const roomMap: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    more: '5+',
};

const priceMapMin: { [key: string]: string } = {
    price_one: 'до ',
    price_two: '5.000 - ',
    price_three: '10.000 - ',
    price_four: '15.000 - ',
    price_five: '20.000 - ',
    price_six: '35.000 - ',
    price_seven: '40.000+ - ',
};

const priceMapMax: { [key: string]: string } = {
    price_one: '5.000 грн',
    price_two: '10.000 грн',
    price_three: '15.000 грн',
    price_four: '20.000 грн',
    price_five: '35.000 грн',
    price_six: '40.000 грн',
    price_seven: '40.000+ грн',
};

const sortingMap: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    more: 5,
    price_one: 1,
    price_two: 2,
    price_three: 3,
    price_four: 4,
    price_five: 5,
    price_six: 6,
    price_seven: 7,
};

const normalizeFilters = (
    {
        pets,
        children,
        firstName,
        cityFilters,
        roomFilters,
        priceFilters,
        districtFilters,
        residentsAmount,
        houseTypeFilters,
    }: TemplateDataType,
    trans: TransFn,
): NormalizedFilters => {
    const sortedRooms = roomFilters.length ? roomFilters.sort((a, b) => sortingMap[a] - sortingMap[b]) : null;
    const sortedPrice = priceFilters.length ? priceFilters.sort((a, b) => sortingMap[a] - sortingMap[b]) : null;

    const room = sortedRooms
        ? sortedRooms.length === 1
            ? roomMap[sortedRooms[0]]
            : roomMap[sortedRooms[0]] + '-' + roomMap[sortedRooms[sortedRooms.length - 1]]
        : '[...]';
    const price = sortedPrice
        ? sortedPrice.length === 1
            ? trans(sortedPrice[0])
            : priceMapMin[sortedPrice[0]] + priceMapMax[sortedPrice[sortedPrice.length - 1]]
        : '[...]';

    return {
        room,
        price,
        user: firstName,
        city: trans(cityFilters),
        houseType: houseTypeFilters.length ? trans('in_' + houseTypeFilters.join('_')) : '[...]',
        district: districtFilters.length ? districtFilters.map(dist => trans(dist)).join(', ') : '[...]',
        metro: cityFilters === 'kyiv' ? trans('near_metro') : '',
        residents: +residentsAmount === 1 ? trans('single') : trans('with_hwo'),
        pets: pets ? `[${trans('pets').toLowerCase()}: ${pets}]` : trans('no_pets').toLowerCase(),
        children: children ? `[${trans('children').toLowerCase()}: ${children}]` : trans('no_children').toLowerCase(),
    };
};

const replacer = (value: string, data: NormalizedFilters): string =>
    value
        .replace(/\$city/i, data.city)
        .replace(/\$user/i, data.user)
        .replace(/\$room/i, data.room)
        .replace(/\$pets/i, data.pets)
        .replace(/\$price/i, data.price)
        .replace(/\$metro/i, data.metro)
        .replace(/\$children/i, data.children)
        .replace(/\$houseType/i, data.houseType)
        .replace(/\$residents/i, data.residents)
        .replace(/\$district/i, data.district);

export const getTitleTemplate = (data: TemplateDataType, trans: TransFn, index = 0): string => {
    const normalizedFilters = normalizeFilters(data, trans);
    const templates = ['title_template_1', 'title_template_2', 'title_template_3', 'title_template_4', 'title_template_5'];
    return replacer(trans(templates[index]), normalizedFilters);
};

export const getDescriptionTemplate = (data: TemplateDataType, trans: TransFn, index = 0): string => {
    const normalizedFilters = normalizeFilters(data, trans);
    const templates = [
        'description_template_1',
        'description_template_2',
        'description_template_3',
        'description_template_4',
        'description_template_5',
    ];
    return replacer(trans(templates[index]), normalizedFilters);
};
