const sortingMap: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    more: 5,
};

type SortRooms = (rooms: string[]) => string[];

const useSortRooms = (): SortRooms => {
    return rooms => [...rooms].sort((a, b) => sortingMap[a] - sortingMap[b]);
};

export default useSortRooms;
