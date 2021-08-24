import { City, SEARCH_FILTERS } from './state/entities/filters/filters.interface';
import { generalFilters, houseTypeFilters, priceFilters, roomFilters } from './config/filters.config';

export interface IChips {
    name: string;
    active: boolean;
    icon?: string;
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

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

export interface SelectValue {
    id: string;
    value: string;
}

export type SelectList = SelectValue[];
