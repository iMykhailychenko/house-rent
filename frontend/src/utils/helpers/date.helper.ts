import { TransFn } from '../../interfaces';

import { addZero } from './number.helper';

export const addMonthToDate = (amount = 1): Date => {
    const today = new Date();
    return new Date(today.setMonth(today.getMonth() + amount));
};

const convertUTCDateToLocalDate = (date: Date): Date => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
};

export const validateDate = (value: string | Date | number): Date => {
    try {
        if (value instanceof Date) return convertUTCDateToLocalDate(value);
        return convertUTCDateToLocalDate(new Date(value));
    } catch (e) {
        return new Date();
    }
};

const month: string[] = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
];

export const formatDate = (value: string | Date | number = new Date(), trans: TransFn): string => {
    const date = validateDate(value);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())} ${trans(month[date.getMonth()])} ${addZero(
        date.getDate(),
    )} ${date.getFullYear()}`;
};

export const formatTime = (value: string | Date | number = new Date()): string => {
    const date = validateDate(value);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
};

const TWENTY_MINUTES_IN_MS = 1_200_000;

export const onlineStatus = (value: string | number | Date = new Date(), trans: TransFn): string => {
    const date = validateDate(value);
    const isOnline = Date.now() - +date < TWENTY_MINUTES_IN_MS;
    return isOnline ? 'online' : formatDate(value, trans);
};
