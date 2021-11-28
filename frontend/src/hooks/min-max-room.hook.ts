import { useCallback } from 'react';

const roomMap: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    more: '5+',
};

type MinMaxRoom = (room: string[] | null) => string;

const useMinMaxRoom = (): MinMaxRoom => {
    return useCallback(room => {
        return room ? (room.length === 1 ? roomMap[room[0]] : roomMap[room[0]] + '-' + roomMap[room[room.length - 1]]) : '[...]';
    }, []);
};

export default useMinMaxRoom;
