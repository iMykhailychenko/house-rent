import { useCallback } from 'react';

import useTrans from './trans.hook';

const priceMapMin: { [key: string]: string } = {
    price_one: '0-',
    price_two: '5-',
    price_three: '10-',
    price_four: '15-',
    price_five: '20-',
    price_six: '35-',
    price_seven: '40+-',
};

const priceMapMax: { [key: string]: string } = {
    price_one: '5 тис. грн',
    price_two: '10 тис. грн',
    price_three: '15 тис. грн',
    price_four: '20 тис. грн',
    price_five: '35 тис. грн',
    price_six: '40 тис. грн',
    price_seven: '40+ тис. грн',
};

type SortPrice = (price: string[] | null) => string;

const useMinMaxPrice = (): SortPrice => {
    const trans = useTrans();

    return useCallback(
        price => {
            return price
                ? price.length === 1
                    ? trans(price[0])
                    : priceMapMin[price[0]] + priceMapMax[price[price.length - 1]]
                : '[...]';
        },
        [trans],
    );
};

export default useMinMaxPrice;
