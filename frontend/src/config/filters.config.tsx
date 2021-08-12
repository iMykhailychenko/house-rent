import React from 'react';

import { IChipsMap } from '../interfaces';
import filtersIconsMap from '../map/filters-icons.map';

export const generalFilters = (init: string[] = []): IChipsMap => ({
    hot: {
        name: 'hot',
        active: init.includes('hot'),
        icon: filtersIconsMap.hot,
        hover: '#cf1322',
    },
});

export const roomFilters = (init: string[] = []): IChipsMap => ({
    one: {
        name: 'one',
        active: init.includes('one'),
        icon: filtersIconsMap.rooms,
    },
    two: {
        name: 'two',
        active: init.includes('two'),
        icon: filtersIconsMap.rooms,
    },
    three: {
        name: 'three',
        active: init.includes('three'),
        icon: filtersIconsMap.rooms,
    },
    four: {
        name: 'four',
        active: init.includes('four'),
        icon: filtersIconsMap.rooms,
    },
    more: {
        name: 'more',
        active: init.includes('more'),
        icon: filtersIconsMap.rooms,
    },
});

export const houseTypeFilters = (init: string[] = []): IChipsMap => ({
    old: {
        name: 'old',
        active: init.includes('old'),
        icon: filtersIconsMap.old_house,
    },
    new: {
        name: 'new',
        active: init.includes('new'),
        icon: filtersIconsMap.new_house,
    },
});

export const priceFilters = (init: string[] = []): IChipsMap => ({
    price_one: {
        name: 'price_one',
        active: init.includes('price_one'),
    },
    price_two: {
        name: 'price_two',
        active: init.includes('price_two'),
    },
    price_three: {
        name: 'price_three',
        active: init.includes('price_three'),
    },
    price_four: {
        name: 'price_four',
        active: init.includes('price_four'),
    },
    price_five: {
        name: 'price_five',
        active: init.includes('price_five'),
    },
    price_six: {
        name: 'price_six',
        active: init.includes('price_six'),
    },
    price_seven: {
        name: 'price_seven',
        active: init.includes('price_seven'),
    },
});

export const cityFilters = (init: string[] = []): IChipsMap => ({
    kyiv: {
        name: 'kyiv',
        active: init.includes('kyiv'),
    },
    lviv: {
        name: 'lviv',
        active: init.includes('lviv'),
    },
    kharkiv: {
        name: 'kharkiv',
        active: init.includes('kharkiv'),
    },
    odesa: {
        name: 'odesa',
        active: init.includes('odesa'),
    },
});
