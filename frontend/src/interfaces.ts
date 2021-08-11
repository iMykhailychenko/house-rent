import { ReactElement } from 'react';

export interface IChips {
    name: string;
    active: boolean;
    icon?: ReactElement;
    hover?: string;
}

export interface IChipsMap {
    [key: string]: IChips;
}

export enum THEME_ENUM {
    WHITE = 'white',
    BLACK = 'black',
}

export enum LANGUAGE_ENUM {
    RU = 'ru',
    UA = 'ua',
}

export interface IConfig {
    cardSize: 'sm' | 'lg';
}

export enum SEARCH_FILTERS {
    GENERAL = 'general',
    ROOMS = 'rooms',
    HOUSE_TYPES = 'houseTypes',
    PRICE = 'price',
}

export type ISearchFilters = {
    [key in SEARCH_FILTERS]: IChipsMap;
};
