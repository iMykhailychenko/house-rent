import { addZero } from './number.helper';

export const addMonthToDate = (amount = 1): Date => {
    const today = new Date();
    return new Date(today.setMonth(today.getMonth() + amount));
};

const validateDate = (value: string | Date | number): Date => {
    try {
        if (value instanceof Date) return value;
        return new Date(value);
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

export const formatDate = (value: string | Date | number = new Date()): string => {
    const date = validateDate(value);
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())} ${month[date.getMonth()]} ${addZero(
        date.getDate(),
    )} ${date.getFullYear()}`;
};
