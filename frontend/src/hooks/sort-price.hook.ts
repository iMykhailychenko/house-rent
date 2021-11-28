import { useCallback } from 'react';

const sortingMap: { [key: string]: number } = {
    price_one: 1,
    price_two: 2,
    price_three: 3,
    price_four: 4,
    price_five: 5,
    price_six: 6,
    price_seven: 7,
};

type SortPrice = (price: string[]) => string[];

const useSortPrice = (): SortPrice => {
    return useCallback(price => {
        return [...price].sort((a, b) => sortingMap[a] - sortingMap[b]);
    }, []);
};

export default useSortPrice;
