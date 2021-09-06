export enum GENERAL_FILTERS {
    HOT = 'hot',
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
    IDLE = 'idle',
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export enum RESIDENTS_AMOUNT {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
    FOUR = 'four',
    MORE = 'more',
}
