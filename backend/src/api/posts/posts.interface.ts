import { PostEntity } from './entities/posts.entity';

export enum GENERAL_FILTERS {
    HOT = 'hot',
}

export enum RESIDENTS_AMOUNT {
    ONE = 'one_resident',
    TWO = 'two_resident',
    THREE = 'three_resident',
    FOUR = 'four_resident',
    FIVE = 'five_resident',
    SIX = 'six_resident',
    MORE = 'more_resident',
}

export enum ROOM_FILTERS {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
    FOUR = 'four',
    MORE = 'more',
}

export enum HOUSE_TYPE_FILTERS {
    NEW = 'new',
    OLD = 'old',
}

export enum PRICE_FILTERS {
    PRICE_ONE = 'price_one',
    PRICE_TWO = 'price_two',
    PRICE_THREE = 'price_three',
    PRICE_FOUR = 'price_four',
    PRICE_FIVE = 'price_five',
    PRICE_SIX = 'price_six',
    PRICE_SEVEN = 'price_seven',
}

export type City = 'kyiv' | 'lviv';

export enum KYIV_DISTRICT_FILTERS {
    DARNYTSIA = 'darnytsia',
    DESNIANSKYI = 'desnianskyi',
    DNIPROVSKYI = 'dniprovskyi',
    HOLOSIIV = 'holosiiv',
    OBOLONSKYI = 'obolonskyi',
    PECHERSKYI = 'pecherskyi',
    PODIL = 'podil',
    SHEVCHENKIVSKYI = 'shevchenkivskyi',
    SOLOMIANSKYI = 'solomianskyi',
    SVIATOSHYNSKYI = 'sviatoshynskyi',
}

export enum LVIV_DISTRICT_FILTERS {
    HALYCH = 'halych',
    RAILWAY = 'railway',
    LYCHAKIV = 'lychakiv',
    SYKHIV = 'sykhiv',
    FRANKO = 'franko',
    SHEVCHENKO = 'shevchenko',
}

export type DISTRICT_FILTERS = KYIV_DISTRICT_FILTERS | LVIV_DISTRICT_FILTERS;

export enum POST_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export const ALL_STATUSES = [POST_STATUS.DRAFT, POST_STATUS.ACTIVE, POST_STATUS.ARCHIVE];

export type PostConfig = PostEntity & {
    isFavorite: boolean;
};
