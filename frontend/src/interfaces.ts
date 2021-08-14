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

export enum SEARCH_FILTERS {
    GENERAL = 'general',
    ROOM = 'room',
    HOUSE_TYPE = 'house_type',
    PRICE = 'price',
    CITY = 'city',
}

export type ISearchFilters = {
    [key in SEARCH_FILTERS]: IChipsMap;
};

export interface IUser {
    firstName: string;
    lastName: string;
}
