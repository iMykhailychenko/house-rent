import { AxiosResponse } from 'axios';

export interface IUser {
    id: number;
    creationDate: string;
    lastActivity: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    email: string;
    role: UserRole[] | null;
}

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

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

export interface SelectValue {
    id: string;
    value: string;
}

export type SelectList = SelectValue[];

export type Pagination<T> = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: T[];
};

export type Response<T> = Promise<AxiosResponse<T>>;

export interface Params {
    [key: string]: unknown;
}
