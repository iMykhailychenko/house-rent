import { IChipsMap } from '../interfaces';
import { City } from '../state/entities/filters/filters.interface';
import { ALL_STATUSES, POST_STATUS } from '../state/entities/posts/posts.interface';

export const generalFilters = (init: string[] = []): IChipsMap => ({
    hot: {
        name: 'hot',
        active: init.includes('hot'),
        icon: 'hot',
        hover: '#cf1322',
    },
});

export const roomFilters = (init: string[] = []): IChipsMap => ({
    one: {
        name: 'one',
        active: init.includes('one'),
        icon: 'rooms',
    },
    two: {
        name: 'two',
        active: init.includes('two'),
        icon: 'rooms',
    },
    three: {
        name: 'three',
        active: init.includes('three'),
        icon: 'rooms',
    },
    four: {
        name: 'four',
        active: init.includes('four'),
        icon: 'rooms',
    },
    more: {
        name: 'more',
        active: init.includes('more'),
        icon: 'rooms',
    },
});

export const houseTypeFilters = (init: string[] = []): IChipsMap => ({
    old: {
        name: 'old',
        active: init.includes('old'),
        icon: 'old_house',
    },
    new: {
        name: 'new',
        active: init.includes('new'),
        icon: 'new_house',
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

export const districtFilters = (city: City = 'kyiv', district: string[] = []): IChipsMap => {
    const districtMap = {
        kyiv: {
            darnytsia: {
                name: 'darnytsia',
                active: district.includes('darnytsia'),
            },
            desnianskyi: {
                name: 'desnianskyi',
                active: district.includes('desnianskyi'),
            },
            dniprovskyi: {
                name: 'dniprovskyi',
                active: district.includes('dniprovskyi'),
            },
            holosiiv: {
                name: 'holosiiv',
                active: district.includes('holosiiv'),
            },
            obolonskyi: {
                name: 'obolonskyi',
                active: district.includes('obolonskyi'),
            },
            pecherskyi: {
                name: 'pecherskyi',
                active: district.includes('pecherskyi'),
            },
            podil: {
                name: 'podil',
                active: district.includes('podil'),
            },
            shevchenkivskyi: {
                name: 'shevchenkivskyi',
                active: district.includes('shevchenkivskyi'),
            },
            solomianskyi: {
                name: 'solomianskyi',
                active: district.includes('solomianskyi'),
            },
            sviatoshynskyi: {
                name: 'sviatoshynskyi',
                active: district.includes('sviatoshynskyi'),
            },
        },
        lviv: {
            halych: {
                name: 'halych',
                active: district.includes('halych'),
            },
            railway: {
                name: 'railway',
                active: district.includes('railway'),
            },
            lychakiv: {
                name: 'lychakiv',
                active: district.includes('lychakiv'),
            },
            sykhiv: {
                name: 'sykhiv',
                active: district.includes('sykhiv'),
            },
            franko: {
                name: 'franko',
                active: district.includes('franko'),
            },
            shevchenko: {
                name: 'shevchenko',
                active: district.includes('shevchenko'),
            },
        },
    };

    return districtMap[city];
};

export const statusFilter = (init: string[] = ALL_STATUSES): IChipsMap => ({
    [POST_STATUS.IDLE]: {
        name: POST_STATUS.IDLE,
        active: init.includes(POST_STATUS.IDLE),
    },
    [POST_STATUS.ACTIVE]: {
        name: POST_STATUS.ACTIVE,
        active: init.includes(POST_STATUS.ACTIVE),
    },
    [POST_STATUS.ARCHIVE]: {
        name: POST_STATUS.ARCHIVE,
        active: init.includes(POST_STATUS.ARCHIVE),
    },
    [POST_STATUS.DRAFT]: {
        name: POST_STATUS.DRAFT,
        active: init.includes(POST_STATUS.DRAFT),
    },
});
