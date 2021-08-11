import { Apartment, HomeWork, Weekend, Whatshot } from '@material-ui/icons';
import React from 'react';

import { IChipsMap } from '../components/common/chips/chips';
import { ISearchFilters, SEARCH_FILTERS } from '../interfaces';

export const generalFilters = (init: string[] = []): IChipsMap => ({
    hot: {
        name: 'hot',
        active: init.includes('hot'),
        icon: <Whatshot />,
        hover: '#cf1322',
    },
});

export const roomsFilters = (init: string[] = []): IChipsMap => ({
    one: {
        name: 'one',
        active: init.includes('one'),
        icon: <Weekend />,
    },
    two: {
        name: 'two',
        active: init.includes('two'),
        icon: <Weekend />,
    },
    three: {
        name: 'three',
        active: init.includes('three'),
        icon: <Weekend />,
    },
    four: {
        name: 'four',
        active: init.includes('four'),
        icon: <Weekend />,
    },
    more: {
        name: 'more',
        active: init.includes('more'),
        icon: <Weekend />,
    },
});

export const houseTypeFilters = (init: string[] = []): IChipsMap => ({
    old: {
        name: 'old',
        active: init.includes('old'),
        icon: <HomeWork />,
    },
    new: {
        name: 'new',
        active: init.includes('new'),
        icon: <Apartment />,
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

type IParams = {
    [key in SEARCH_FILTERS]?: string[];
};
export const getAllChipsFilters = (params?: IParams): ISearchFilters => ({
    [SEARCH_FILTERS.GENERAL]: generalFilters(params?.[SEARCH_FILTERS.GENERAL]),
    [SEARCH_FILTERS.PRICE]: priceFilters(params?.[SEARCH_FILTERS.PRICE]),
    [SEARCH_FILTERS.ROOMS]: roomsFilters(params?.[SEARCH_FILTERS.ROOMS]),
    [SEARCH_FILTERS.HOUSE_TYPES]: houseTypeFilters(params?.[SEARCH_FILTERS.HOUSE_TYPES]),
});
